import sys

epoch = 4
folder = 'TrainedParameters'
outfile = open(f'{folder}/data.csv','w+')
for i in range(1,sys.argv[1]+1):
	label = f'{str(i)}'
	for j in range(1,epoch+1):
		filename = f'{folder}/{i}/epoch{str(j)}.txt'
		fid = open(filename,'r')
		data = fid.readlines()
		values = []
		for value in data:
			# print (label)
			values.append(value.strip())
		values.append(str(i))
		# print(values)
		outfile.write(','.join(values)+'\n')
outfile.close()
