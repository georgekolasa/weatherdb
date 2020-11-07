import os
import sys
import argparse
import re
from datetime import datetime
import csv
from pathlib import Path

test_str = 'WA010101860191701PRCP   20  I    0  I    0  I    0  I   10  I   10  I    0  I    0  I   30  I    0  I    0  I    0  I   10  I    0  I    0  I    0  I    0  I    0  I  180  I   30  I    0  I   80  I    0  I   80  I  110  I   30  I    0  I   30  I   80  I   20  I  130  I'


class Record:
    def __init__(self, ID, year, month, element, vals, mflags, qflags, sflags):
        self.ID = ID
        self.year = year
        self.month = month
        self.element = element
        self.vals = vals
        self.mflags = mflags
        self.qflags = qflags
        self.sflags = sflags

    def __str__(self):
        return 'RECORD ID: {}\nYEAR: {}\nMONTH: {}\nELEMENT: {}\nVALS: {}\nMFLAGS: {}\nQFLAGS: {}\nSFLAGS: {}'.format(self.ID, self.year, self.month, self.element,
                                                                                                                      self.vals, self.mflags, self.qflags, self.sflags)


class Parser:
    def __init__(self, input_file):
        self.input_file = input_file
        self.parent_directory = Path(input_file).parent
        self.records = []

        # TODO: define these
        self.csv_headers = ['']

    def parse_file(self):
        path_obj = Path(self.input_file)

        ext = path_obj.suffix

        if ext is None:
            print('wrong file type')
            sys.exit(1)

        ext = ext.replace('.', '')

        if ext.lower() != 'dly' and ext.lower() != 'txt':
            print('wrong file type, only dly and txt files')
            sys.exit(1)

        with open(self.input_file, 'r') as f:
            lines = f.readlines()

            for line in lines:
                ID = line[0:11]  # first 11 characters are the ID
                year = line[11:15]  # characters 12 - 15 are year
                month = line[15:17]  # characters 12 - 15 are year
                element = line[17:21]

                vals = []
                mflags = []
                qflags = []
                sflags = []

                iter = 21
                while iter < 269:
                    current_val = line[iter:iter+5]
                    mflag = line[iter+5]
                    qflag = line[iter+6]
                    sflag = line[iter+7]

                    vals.append(current_val.strip())
                    mflags.append(mflag.strip())
                    qflags.append(qflag.strip())
                    sflags.append(sflag.strip())

                    iter += 8

                self.records.append(Record(ID, year, month, element,
                                           vals, mflags, qflags, sflags))

    def write_out(self):
        parsed_output = os.path.join(
            self.parent_directory, 'READINGS_TABLE.csv')
        with open(parsed_output, 'w') as f:
            writer = csv.writer(f, delimiter=',',
                                quotechar='"', quoting=csv.QUOTE_MINIMAL)

            writer.writerow(self.csv_headers)

            for record in self.records:
                # FIXME: make this match our DB schema
                writer.writerow(
                    [record.ID, record.year, record.month, record.element]
                )


def cli():
    my_parser = argparse.ArgumentParser(
        description="utility created for my db class")

    my_parser.add_argument('-f', '--file', action='store',
                           required=True, help="the xlsx or csv of weather data")

    args = my_parser.parse_args()

    _file = args.file

    parser = Parser(_file)
    parser.parse_file()

    # records = parse_file(_file)
    # for record in records:
    #     print(record, end='\n\n')


if __name__ == "__main__":
    cli()


# WA010101860191701PRCP   20  I    0  I    0  I    0  I   10  I   10  I    0  I    0  I   30  I    0  I    0  I    0  I   10  I    0  I    0  I    0  I    0  I    0  I  180  I   30  I    0  I   80  I    0  I   80  I  110  I   30  I    0  I   30  I   80  I   20  I  130  I
