#!/usr/bin/env python3
""" Build index from directory listing

make_index.py 
Ref: https://stackoverflow.com/questions/39048654/how-to-enable-directory-indexing-on-github-pages
"""

INDEX_TEMPLATE = r"""
<html>
<body>
<p>
% for name in names:
    <li><a href="${name}">${name}</a></li>
% endfor
</p>
</body>
</html>
"""

JSON_TEMPLATE = r"""
{
[
% for name in names:
   { "name":"${name}" },
% endfor
]
"""

EXCLUDED = ['index.html', 'make_index.py', 'index.json']

import os
import argparse

# May need to do "pip install mako"
from mako.template import Template
import json


def main():
    fnames = [fname for fname in sorted(os.listdir("."))
              if fname not in EXCLUDED]
    with open('index.html', 'w+') as fd:
        fd.write(Template(INDEX_TEMPLATE).render(names=fnames))

    data = {
        'national' : [],
        'regions' : [],
        'state' : [],
    }
    for fn in fnames:
        parts = fn.split('_')
        for ft in data.keys():
            if fn.startswith(ft):
                parts[0] = parts[0].replace(ft,'')
                data[ft].append({
                    "name": fn,
                    "type": parts[0],
                    "start": int(parts[1]),
                    "end": int(parts[2]),
                })
                break;
        

    with open('index.json', 'w+') as fd:
        #fd.write(Template(JSON_TEMPLATE).render(names=fnames))
        fd.write(json.dumps(data))


if __name__ == '__main__':
    main()
