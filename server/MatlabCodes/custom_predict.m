%test = load('anto.csv');
test = load('jaffrey.csv');

mu = load('../TrainedParameters/mu.csv');
sigma = load('../TrainedParameters/sigma.csv');
Theta1 = load('../TrainedParameters/theta1.csv');
Theta2 = load('../TrainedParameters/theta2.csv');

plot(test);

%%{
test = test(1051:end,:); %discard first 1050 rows
test = test(1:1279,:); %discard extra data
test = bandpass(test,[1, 50],512);
test = pwelch(test,512,256,100);
test = test - mu';
test = test./sigma';
test = test';
pred = predict(Theta1, Theta2, test);
disp("class: "+pred)
%%}