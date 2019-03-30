from matlab import engine as me
import sys

en = me.start_matlab()
en.cd("E:\portunus\server\MatlabCodes")

run = {
    1: lambda : print(en.epoch_separation(int(sys.argv[2]), int(sys.argv[3]), nargout=0)),
    2: lambda : print(en.feature_extraction(int(sys.argv[2]), int(sys.argv[3]), nargout=0)),
    3: lambda : print(en.bpnn(int(sys.argv[2]), int(sys.argv[3]), nargout=0)),
    4: lambda : print(en.custom_predict(int(sys.argv[2]), nargout=0))
}

run[int(sys.argv[1])]()
en.quit()