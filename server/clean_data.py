import sys
import re
import os

filename = sys.argv[1]
filename = os.path.join(os.getcwd(), 'server', 'UserEEGData', f'{filename}.csv')

with open(filename,'r') as f:
    fdata = f.read().split()

with open(filename,'w') as f:
    # print(fdata)
    cleansed_data = list(filter(lambda el: re.match('([\d]+|-[\d]+)',el),fdata))
    # print(cleansed_data)
    f.write('\n'.join(cleansed_data))
