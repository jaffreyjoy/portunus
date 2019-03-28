function custom_predict(index)
    test = load('../UserEEGData/login.csv');

    filename = strcat('../TrainedParameters/',sprintf("%d/", index));

    mu = load(strcat(filename,sprintf("mu.csv")));
    sigma = load(strcat(filename,sprintf("sigma.csv")));
    Theta1 = load(strcat(filename,sprintf("theta1.csv")));
    Theta2 = load(strcat(filename,sprintf("theta2.csv")));

    test = test(1051:end,:); %discard first 1050 rows
    test = test(1:1279,:); %discard extra data
    test = bandpass(test,[1, 50],512);
    test = pwelch(test,512,256,100);
    test = test - mu';
    test = test./sigma';
    test = test';
    [pred, h2] = predict(Theta1, Theta2, test);
    disp([pred, h2])
    if pred==2
        if h2(2) > 0.85
            disp("login-success")
        else
            disp("login-fail")
        end
    else
        disp("login-fail")
    end
end