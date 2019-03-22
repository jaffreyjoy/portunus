import sys
import os

epoch = 4
folder = os.path.join(os.getcwd(), 'server', 'TrainedParameters')
folderFeature = os.path.join(os.getcwd(), 'server', 'FeatureVector')
print(f'folder: {folder}')
print(os.getcwd())
outfile = open(f'{folder}/data.csv','w+')
print("in merge_files_custom")
for i in range(1, int(sys.argv[1])+1):
	label = f'{str(i)}'
	for j in range(1,epoch+1):
		filename = os.path.join(folderFeature, f'{i}', f'epoch{j}.txt')
		fid = open(filename,'r')
		data = fid.readlines()
		values = []
		for value in data:
			# print (label)
			values.append(value.strip())
		values.append(str(i))
		# print(values)
		outfile.write(','.join(values)+'\n')
		fid.close()
outfile.close()
