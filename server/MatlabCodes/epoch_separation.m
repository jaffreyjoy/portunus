function epoch_separation(num_of_users)
    mydata = [];
    formatSpec = "%3.6f";

    input_path = "../UserEEGData/";
    output_path = "../EpochSepData/";

    filename = strcat(input_path,sprintf('%d.csv',num_of_users));
    temp1 = csvread(filename);
    mydata = [];
    mydata = horzcat(mydata,temp1);
    
    mydata = mydata(1051:end,:);

    k = 1;
    epochs = 60
    for i=1:epochs
        filename1 = strcat(output_path,sprintf('/%d/epoch%d.csv',num_of_users,i));
        fid = fopen(filename1,'w');
        dlmwrite(filename1,mydata(k:k+1279,:),'delimiter',',','precision','%3.6f')
        k = k+1279;
        fclose(fid);
    end
end