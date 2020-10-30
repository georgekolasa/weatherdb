import os
import sys
import argparse
import re
from datetime import datetime
# import pandas as pd
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


def parse_file(file_path):
    path_obj = Path(file_path)

    ext = path_obj.suffix

    if ext is None:
        print('wrong file type')
        sys.exit(1)

    ext = ext.replace('.', '')

    if ext.lower() != 'dly' and ext.lower() != 'txt':
        print('wrong file type, only dly and txt files')
        sys.exit(1)

    with open(file_path, 'r') as f:
        lines = f.readlines()

        records = []

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

            records.append(Record(ID, year, month, element,
                                  vals, mflags, qflags, sflags))

    return records


def test():
    ID = test_str[0:11]  # first 11 characters are the ID
    year = test_str[11:15]  # characters 12 - 15 are year
    month = test_str[15:17]  # characters 12 - 15 are year
    element = test_str[17:21]

    vals = []
    mflags = []
    qflags = []
    sflags = []

    iter = 21
    while iter < 261:
        current_val = test_str[iter:iter+5]
        mflag = test_str[iter+5]
        qflag = test_str[iter+6]
        sflag = test_str[iter+7]

        vals.append(current_val.strip())
        mflags.append(mflag.strip())
        qflags.append(qflag.strip())
        sflags.append(sflag.strip())

        iter += 8

    print(ID, year, month, element, vals, mflags, sflags)


def cli():
    # print('TESTING STRING:', test_str, '\n')

    # print('PARSED VALUES')
    # test()
    my_parser = argparse.ArgumentParser(
        description="utility created for my db class")

    my_parser.add_argument('-f', '--file', action='store',
                           required=True, help="the xlsx or csv of weather data")

    args = my_parser.parse_args()

    _file = args.file

    parsed_file = parse_file(_file)
    for record in parsed_file:
        print(record, end='\n\n')


if __name__ == "__main__":
    cli()


# WA010101860191701PRCP   20  I    0  I    0  I    0  I   10  I   10  I    0  I    0  I   30  I    0  I    0  I    0  I   10  I    0  I    0  I    0  I    0  I    0  I  180  I   30  I    0  I   80  I    0  I   80  I  110  I   30  I    0  I   30  I   80  I   20  I  130  I
