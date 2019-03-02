import sys

filename = sys.argv[1]

with open(filename,'r') as f:
    fdata = f.read().split()

with open(filename,'w') as f:
    # print(fdata)
    cleansed_data = list(filter(lambda el: not el.isalpha(),fdata))
    # print(cleansed_data)
    f.write('\n'.join(cleansed_data))
