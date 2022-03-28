#!/usr/bin/env python3
import os, glob
import pandas as pd
import argparse

jsonFile = 'index.json'
processingFile =  'make_index.py'
htmlFile =  'index.html'
dsStore = '.DS_Store'

EXCLUDED = [htmlFile, processingFile, jsonFile, dsStore]

removeFields = ['#grids']

# May need to do "pip install mako"
from mako.template import Template
import json

def main():
    fnames = [fname for fname in sorted(os.listdir('.')) if fname not in EXCLUDED]
    for fn in fnames:
       oldbase = os.path.splitext(fn)
       newname = fn.replace('.csv', '.txt')
       os.rename(fn, newname)
       df = pd.read_csv(newname)

       # make file headers consistent
       for colName in df.columns:
           df.rename(columns={' Year': 'Year', 'year': 'Year'}, inplace=True)
           if 'regions' in newname:
               df.rename(columns={'AK': 'Alaska', 'HI': 'Hawaii', 'MW': 'Midwest', 'NE': 'Northeast', 'NGP': 'Northern Great Plains', 'NW': 'Northwest', 'SE': 'Southeast', 'SGP': 'Southern Great Plains', 'SW': 'Southwest'}, inplace=True)

           for deleteField in removeFields:
               if deleteField in colName:
                   df.drop(columns = [colName], inplace= True)

       df.to_csv(newname, index=False)

    data = {
        'national' : [],
        'regions' : [],
        'state' : [],
    }

    fnames = [fname for fname in sorted(os.listdir('.')) if fname not in EXCLUDED]
    for fn in fnames:
        parts = fn.split('_')
        for ft in data.keys():
            if fn.startswith(ft):
                parts[0] = parts[0].replace(ft,'')
                robust = False
                startYear = 1900

                if parts[1].isnumeric():
                    startYear = int(parts[1])

                    if parts[2].isnumeric():
                        endYear = int(parts[2])
                    else:
                        tempStr = parts[2]
                        tempStr = tempStr.split('.')
                        tempStr = tempStr[0]
                        endYear = int(tempStr[-4:])

                    season = 'yearly'
                    if startYear == 1950:
                        robust = True
                else:
                    startYear = int(parts[2])
                    endYear = int(parts[3])
                    season = parts[1]
                    if startYear == 1950:
                        robust = True

                data[ft].append({
                    "name": fn,
                    "type": parts[0],
                    "start": startYear,
                    "end": endYear,
                    "robust": robust,
                    "period": str(startYear) + '-current',
                    "season": season,
                })
                break;

    data['regional'] = data.pop('regions')
    with open(jsonFile, 'w+') as fd:
        fd.write(json.dumps(data, sort_keys=True, indent=4))


if __name__ == '__main__':
    main()
