from matlab import engine as me
import sys

print('jello')
en = me.start_matlab()
en.cd("E:\portunus\server\MatlabCodes")
print(en.pwd())

run = {
    1: lambda : print(f"chocos {en.epoch_separation(int(sys.argv[2]), nargout=0)}"),
    2: lambda : print(f"chocos {en.feature_extraction(int(sys.argv[2]), nargout=0)}"),
    3: lambda : (print(f"chocos {en.bpnn(int(sys.argv[2]), nargout=0)}"))
}

run[int(sys.argv[1])]()
en.quit()