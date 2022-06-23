def myAddFunc(a: int, b: int):
    return 0

def getFactrial(a: int):
    if a == 0:
        return 1
    else:
        return a * getFactrial(a - 1)

def main():
    A = 10
    B = 20
    AandB = 30

    # print("-----")
    # ここで何か処理している。
    # print("-----")

    print(getFactrial(AandB))

if __name__ == '__main__':
    main()
