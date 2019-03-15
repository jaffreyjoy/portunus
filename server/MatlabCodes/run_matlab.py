from matlab import engine as me
import sys

en = me.start_matlab()
run = {
    1: lambda : print(f"chocos {en.epoch_separation(sys.argv[2])}")
    2: lambda : print(f"chocos {en.feature_extraction(sys.argv[2])}")
    3: lambda : print(f"chocos {en.bpnn(sys.argv[2])}")
}

run[sys.argv[1]()]
en.quit()