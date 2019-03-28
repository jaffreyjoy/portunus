function bpnn(num_of_users, noOfEpochs)
    X = load('../TrainedParameters/data.csv');
    X_train = X(:,1:num_features);
    y_train = X(:,num_features+1);
    
    %initialization
    num_features = 51;
    input_layer_size  = num_features;
    hidden_layer_size = 50;
    num_labels = num_of_users;
    rows = noOfEpochs;

    %randomize rows
    X_temp = [X_train,y_train];
    X_temp = X_temp(randperm(size(X_temp,1)),:);
    X_train = X_temp(:,1:num_features);
    y_train = X_temp(:,num_features+1);

    %normalization
    for i = 1:num_features
        Y = X_train(:,i);
        mean_m = mean(Y);
        mu(1,i) = mean_m;
        Y = Y - mean_m;
        std_s = std(Y);
        sigma(1,i) = std_s;
        Y = Y/std_s;
        X_train(:,i) = Y;
    end

    m = size(X_train, 1);

    %Initializing Pameters
    initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size);
    initial_Theta2 = randInitializeWeights(hidden_layer_size, num_labels);

    % Unroll parameters
    initial_nn_params = [initial_Theta1(:) ; initial_Theta2(:)];


    %Training NN
    options = optimset('MaxIter', 250);

    lambda = 0.03;

    costFunction = @(p) nnCostFunction(p, ...
                                    input_layer_size, ...
                                    hidden_layer_size, ...
                                    num_labels, X_train, y_train, lambda);

    [nn_params, cost] = fmincg(costFunction, initial_nn_params, options);

    Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
                    hidden_layer_size, (input_layer_size + 1));

    Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
                    num_labels, (hidden_layer_size + 1));
    
    dlmwrite('../TrainedParameters/theta1.csv',Theta1,'delimiter',',','precision','%3.6f')
    dlmwrite('../TrainedParameters/theta2.csv',Theta2,'delimiter',',','precision','%3.6f')
    dlmwrite('../TrainedParameters/mu.csv',mu,'delimiter',',','precision','%3.6f')
    dlmwrite('../TrainedParameters/sigma.csv',sigma,'delimiter',',','precision','%3.6f')

end