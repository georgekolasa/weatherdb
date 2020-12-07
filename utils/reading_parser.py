import sys
from glob import glob


class Record:
    def __init__(self, line):
        self.STATION_ID = line[0:11].strip()
        self.YEAR = int(line[11:15])
        self.MONTH = int(line[15:17].strip())
        self.ELEMENT = line[17:21].strip()
        line = line[21:]
        self.observations = []
        while len(line) > 7:
            val = int(line[0:5])
            if val == -9999:
                self.observations.append(None)
            else:
                self.observations.append(val)
            line = line[8:]


def generateFile(countries, output, elementsList, printEveryXFiles):
    stations = []
    for c in countries:
        stations.append(c + '*.dly')
    input_files = []
    for station in stations:
        input_files.extend(glob(station))
    r_file = open(output, 'a')
    j = len(input_files)
    k = 0
    l = 0
    for file in input_files:
        if k % printEveryXFiles == 0:
            print(k, 'of', j, '. ', l, 'lines written.')
        k += 1
        f = open(file)
        for line in f:
            reading = Record(line)
            if reading.YEAR not in range(1950, 2001):
                continue
            if (reading.ELEMENT in elementsList) or not elementsList:
                for i in range(len(reading.observations)):
                    if reading.observations[i] is None:
                        observation = 'NULL'
                    else:
                        observation = reading.observations[i]
                    day = str(i+1)
                    if i < 9:
                        day = '0' + day
                    date = '\'' + str(reading.YEAR) + '-' + \
                        str(reading.MONTH) + '-' + day + '\''
                    if observation != 'NULL':
                        r_file.write(
                            f''''{reading.STATION_ID}','{reading.ELEMENT}',{observation},{date}\n''')
                        l += 1


countriesList = []
while True:
    country = input(
        'Enter country to select (enter to select all / stop with current selection): ')
    if not country:
        break
    countriesList.append(country)
elementsList = []
while True:
    element = input(
        'Enter element to select (enter to select all / stop with current selection): ')
    if not element:
        break
    elementsList.append(element)
output = input('Relative filepath to store output (e.g. ../data/out.txt): ')
lines = int(input('Print status every X files read: '))
generateFile(countriesList, output, elementsList, lines)
