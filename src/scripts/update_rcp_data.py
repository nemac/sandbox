import os
import requests
import json
from datetime import datetime

def get_climate_variable(gridType):
    if gridType == 0:
        return "cdd"

    elif gridType == 1:
        return "hdd"

    elif gridType == 2:
        return "pcpn"

    elif gridType == 3:
        return "maxt"

    elif gridType == 4:
        return "mint"

    elif gridType == 5:
        return "avgt"


def get_misc_variables(climate_variable):
    var_mapping = {
        'cdd': {'reduce': 'sum', 'units': 'inch'},
        'hdd': {'reduce': 'sum', 'units': 'inch'},
        'pcpn': {'reduce': 'sum', 'units': 'inch'},
        'maxt': {'reduce': 'mean', 'units': 'degreeF'},
        'mint': {'reduce': 'mean', 'units': 'degreeF'},
        'avgt': {'reduce': 'mean', 'units': 'degreeF'}
    }

    return var_mapping[climate_variable]

url = "https://grid2.rcc-acis.org/GridData"

for gridType in range(6):
    climate_variable = get_climate_variable(gridType)
    misc_variables_dict = get_misc_variables(climate_variable)
    reduce = misc_variables_dict['reduce']
    units = misc_variables_dict['units']

    payload = {
        "grid": "loca:wMean:rcp85",
        "sdate": "2023-01-01",
        "edate": "2099-12-31",
        "elems": [
            {
                "name": climate_variable,
                "interval": "yly",
                "duration": "yly",
                "reduce": reduce,
                "units": units,
                "area_reduce": "state_mean",
            },
        ],
        "bbox": "-124.848974,24.396308,-66.885444,49.384358",
    }

    response = requests.post(url, json=payload)
    if response.status_code == 200:
        data = response.json()  # Parse the response JSON

        # Define the path to save the response JSON file
        desktop_path = os.path.expanduser("/home/runner/work/sandbox/sandbox/sandboxdata/RCP_Sandbox_Datafiles/")
        response_filename = f"rcp85_state_{climate_variable}_sandbox_{datetime.now().year}_{datetime.now().month}.json"
        response_filepath = os.path.join(desktop_path, response_filename)

        # Write the response JSON to the file
        with open(response_filepath, 'w') as file:
            json.dump(data, file, indent=4)

        print(f"Response JSON saved to {response_filepath}")