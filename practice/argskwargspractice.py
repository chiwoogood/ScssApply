def example(*args):
    for value in args:
        print(value)
        

example(1,[1,2,3],'String',{"name":"john"})


def example2(**kwargs):
    for key, value in kwargs.items():
        print(key,value)

example2(name="chiwoo",age=18,gender="M")
