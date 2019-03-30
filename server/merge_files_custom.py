import sys
import os

epochs = int(sys.argv[2])
folder = os.path.join(os.getcwd(), 'server', 'TrainedParameters')
folderFeature = os.path.join(os.getcwd(), 'server', 'FeatureVector')
outfile = open(f'{folder}/data.csv','w+')
for i in range(1, int(sys.argv[1])+1):
	label = f'{str(i)}'
	for j in range(1,epochs+1):
		filename = os.path.join(folderFeature, f'{i}', f'epoch{j}.txt')
		fid = open(filename,'r')
		data = fid.readlines()
		values = []
		for value in data:
			values.append(value.strip())
		values.append(str(i))
		outfile.write(','.join(values)+'\n')
		fid.close()
outfile.close()
