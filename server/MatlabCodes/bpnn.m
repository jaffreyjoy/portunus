function bpnn(num_of_users, noOfEpochs)
    X = load('../TrainedParameters/data.csv');

    num_features = 51;
    input_layer_size  = num_features;
    hidden_layer_size = 50;
    num_labels = num_of_users; %change
    num_output_nodes = 2;
    rows = noOfEpochs; %change

    X_train = [];
    y_train = [];

    X_cv = [];
    y_cv = [];

    start = 1;
    mid = floor(rows*0.8);
    rest = rows-mid;

    input_path = "../TrainedParameters/";

    %%{

    disp("-------------TRAINING-------------")

    for i=1:num_labels
        
        X_train = [];
        y_train = [];
        
        user = i;
        disp("Training model for user: ");
        disp(user);
    
        X_train = X(start:start+mid-1,1:num_features);
        y_train = X(start:start+mid-1,num_features+1);
        y_train(:) = 2;
        start = start + mid;
        
        %balance training data classes
        
        for j = 1:num_labels
        temp = 0;
        if(j~=user)  
            temp = ceil(mid/(num_labels-1));
        end
        s = (j-1)*rows+1;
        X_train = [X_train; X(s:s+temp-1,1:num_features)];
        y_train = [y_train; ones(temp,1)];
        end
        
        start = i*rows+1;
        
        for j = 1:num_features
        Y = X_train(:,j);
        mean_m = mean(Y);
        mu(1,j) = mean_m;
        Y = Y - mean_m;
        std_s = std(Y);
        sigma(1,j) = std_s;
        Y = Y/std_s;
        X_train(:,j) = Y;
        end
        
        initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size);
        initial_Theta2 = randInitializeWeights(hidden_layer_size, num_output_nodes);

        initial_nn_params = [initial_Theta1(:) ; initial_Theta2(:)];
        
        options = optimset('MaxIter', 250);
        lambda = 0.03;
        
        costFunction = @(p) nnCostFunction(p, ...
                                        input_layer_size, ...
                                        hidden_layer_size, ...
                                        num_output_nodes, X_train, y_train, lambda);
    
        [nn_params, cost] = fmincg(costFunction, initial_nn_params, options);
        
        Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
                        hidden_layer_size, (input_layer_size + 1));
                        
                        
        Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
                        num_output_nodes, (hidden_layer_size + 1));
        
        filename = strcat(input_path,sprintf("%d/",user));

        dlmwrite(strcat(filename,sprintf("theta1.csv")),Theta1,'delimiter',',','precision','%3.6f')
        dlmwrite(strcat(filename,sprintf("theta2.csv")),Theta2,'delimiter',',','precision','%3.6f')
        dlmwrite(strcat(filename,sprintf("mu.csv")),mu,'delimiter',',','precision','%3.6f')
        dlmwrite(strcat(filename,sprintf("sigma.csv")),sigma,'delimiter',',','precision','%3.6f')
        
        start = user*rows+1; 
    end
end