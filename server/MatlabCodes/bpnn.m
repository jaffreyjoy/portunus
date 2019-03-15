function bpnn(num_of_users)
    X = load('data.csv');

    t_error = [];
    cv_error = [];

    num_features = 51;

    input_layer_size  = num_features;

    hidden_layer_size = 50;
    num_labels = 10;

    epochs = 4;
    rows = epochs*num_of_users;

    X_train = [];
    y_train = [];

    X_cv = [];
    y_cv = [];

    start = 1;
    mid = floor(rows*0.8);
    rest = rows-mid;

    for i=1:num_labels
        X_train = [X_train; X(start:start+mid-1,1:num_features)]; %229
        y_train = [y_train; X(start:start+mid-1,num_features+1)];
        start = start + mid;
        X_cv = [X_cv; X(start:start+rest-1,1:num_features)];
        y_cv = [y_cv; X(start:start+rest-1,num_features+1)];
        start = i*epochs+1;
    end
    %randomize rows
    X_temp = [X_train,y_train];
    X_temp = X_temp(randperm(size(X_temp,1)),:);
    X_train = X_temp(:,1:num_features);
    y_train = X_temp(:,num_features+1);

    X_temp = [X_cv,y_cv];
    X_temp = X_temp(randperm(size(X_temp,1)),:);
    X_cv = X_temp(:,1:num_features);
    y_cv = X_temp(:,num_features+1);

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

    for i = 1:num_features
        Y = X_cv(:,i);
        mean_m = mu(1,i);
        Y = Y - mean_m;
        std_s = sigma(1,i);
        Y = Y/std_s;
        X_cv(:,i) = Y;
    end

    m = size(X_train, 1);

    %% ================ Part 6: Initializing Pameters ================
    initial_Theta1 = randInitializeWeights(input_layer_size, hidden_layer_size);
    initial_Theta2 = randInitializeWeights(hidden_layer_size, num_labels);

    % Unroll parameters
    initial_nn_params = [initial_Theta1(:) ; initial_Theta2(:)];


    %% =================== Part 8: Training NN ===================
    options = optimset('MaxIter', 5000);

    lambda = 0.035;

    costFunction = @(p) nnCostFunction(p, ...
                                    input_layer_size, ...
                                    hidden_layer_size, ...
                                    num_labels, X_train, y_train, lambda);

    [nn_params, cost] = fmincg(costFunction, initial_nn_params, options);

    Theta1 = reshape(nn_params(1:hidden_layer_size * (input_layer_size + 1)), ...
                    hidden_layer_size, (input_layer_size + 1));

    Theta2 = reshape(nn_params((1 + (hidden_layer_size * (input_layer_size + 1))):end), ...
                    num_labels, (hidden_layer_size + 1));
    
    filename1 = '../TrainedParameters';
    dlmwrite(filename1,Theta1,'delimiter',',','precision','%3.6f')
    dlmwrite(filename1,Theta2,'delimiter',',','precision','%3.6f')
    dlmwrite(filename1,mu,'delimiter',',','precision','%3.6f')
    dlmwrite(filename1,sigma,'delimiter',',','precision','%3.6f')

end