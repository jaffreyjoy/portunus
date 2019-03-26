function feature_extraction(num_of_users)
    mydata = [];
    formatSpec = "%3.6f";
    j = num_of_users; %file
    k = 0; %epoch

    input_path = "../EpochSepData/";
    output_path = "../FeatureVector/";

    epoch = 60;
    for k=1:epoch
        filename = strcat(input_path,sprintf("%d/epoch%d.csv",j,k));
        data = csvread(filename);
        data = data(:,1);
        my_mean = mean(data(:));
        data=data-my_mean;
        y = bandpass(data,[1, 50],512);

        psd = pwelch(y,512,256,100);
        feature_vector = psd;

        filename1 = strcat(output_path,sprintf("%d/epoch%d.txt",j,k));
        fid = fopen(filename1,'w');
        dlmwrite(filename1,feature_vector,'delimiter',',','precision','%f');
        fclose(fid);
    end
end

