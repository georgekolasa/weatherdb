test_str = 'IN012070800  19.1170   72.8500   14.0    BOMBAY/SANTACRUZ                       43003'


class Record:
    def __init__(self, line):
        self.ID = line[0:11].strip()
        self.latitude = line[12:20].strip()
        self.longitude = line[21:30].strip()
        self.elevation = line[31:37].strip()
        self.state = line[38:40].strip()
        self.name = line[41:71].replace('\'', '\'\'').strip()
        self.gsn_flag = line[72:75].strip()
        self.hcn_flag = line[76:79].strip()
        self.wmo_id = line[80:85].strip()
        self.country = line[0:2]
        
input_file = open('ghcnd-stations.txt')
out_file = open('stations.sql', 'w')
for line in input_file:
    station = Record(line)
    out_file.write(f'''INSERT INTO STATION VALUES ('{station.ID}',{station.latitude},{station.longitude},{station.elevation},'{station.country}','{station.state}','{station.name}','{station.gsn_flag}','{station.hcn_flag}','{station.wmo_id}');\n''')
    