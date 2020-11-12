import sys
from glob import glob

class Record:
    def __init__(self, line):
        self.STATION_ID = line[0:11].strip()
        self.YEAR = int(line[11:15])
        self.MONTH = int(line[15:17].strip())
        self.ELEMENT = line[17:21].strip()
        self.READING_ID = line[0:21].strip()
        line = line[21:]
        self.observations = []
        self.m_flags = []
        self.q_flags = []
        self.s_flags = []
        while len(line) > 7:
            val = int(line[0:5])
            if val == -9999:
                self.observations.append(None)
            else:
                self.observations.append(val)
            if line[5] == ' ':
                self.m_flags.append('NULL')
            else:
                self.m_flags.append('\'' + line[5] + '\'')
            if line[6] == ' ':
                self.q_flags.append('NULL')
            else:
                self.q_flags.append('\'' + line[6] + '\'')
            if line[7] == ' ':
                self.s_flags.append('NULL')
            else:
                self.s_flags.append('\'' + line[7] + '\'')
            line = line[8:]
        
        
input_files = glob('*.dly')
out_file = open('readings.sql', 'w')
for file in input_files:
    f = open(file)
    for line in f:
        reading = Record(line)
        out_file.write(f'''INSERT INTO READING VALUES ('{reading.READING_ID}',{reading.YEAR},{reading.MONTH},'{reading.ELEMENT}','{reading.STATION_ID}');\n''')
        
        for i in range(len(reading.observations)):
            if reading.observations[i] is None:
                observation = 'NULL'
            else:
                observation = reading.observations[i]
            day = str(i+1)
            if i < 9:
                day = '0' + day
            observationID = reading.READING_ID + day
            date = 'DATE \'' + str(reading.YEAR) + '-' + str(reading.MONTH) + '-' + day + '\''
            if observation is not 'NULL':
                out_file.write(f'''INSERT INTO OBSERVATION VALUES ('{observationID}','{reading.READING_ID}','{reading.ELEMENT}',{observation},{reading.s_flags[i]},{reading.m_flags[i]},{reading.q_flags[i]},{date});\n''')        
    