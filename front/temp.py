class Temp:
    def func1(self, a, b):
        return a + b
    
    def func2(self, a, b):
        return a - b

# Temp 클래스의 인스턴스 생성
temp_instance = Temp()

# 인스턴스를 통해 func1 메서드 호출
result1 = temp_instance.func1(3, 5)
print(result1)  # 출력: 8

# 인스턴스를 통해 func2 메서드 호출
result2 = temp_instance.func2(3, 5)
print(result2)  # 출력: -2


def my_function(*args, **kwargs):
    print("Positional arguments:", args)
    print("Keyword arguments:", kwargs)

# 함수 호출
my_function(1, 2, 3, name='John', age=30)




def add_random(*args, **kwargs):
    print(sum(args))
    
    for key, value in kwargs.items():
        print(key, value)

add_random(1.5, 2, 3, hello='eee')


node = lambda x : x
print(node(5))



class Animal:
    def speak(self):
        print("동물이 소리를 냅니다.")

class Dog(Animal):
    def speak(self):
        print("멍멍!")

class Cat(Animal):
    def speak(self):
        print("야옹!")

class Bird(Animal):
    pass  # 부모 클래스의 메서드를 그대로 사용할 것이므로 오버라이드하지 않음

# 각 클래스의 메서드 호출
animal = Animal()
animal.speak()

dog = Dog()
dog.speak()

cat = Cat()
cat.speak()

bird = Bird()
bird.speak()  # 부모 클래스의 메서드가 호출됩니다.





class Animal:
    def speak(self):
        print("동물이 소리를 냅니다.")

class Dog(Animal):
    def speak(self):
        super().speak()  # 부모 클래스의 speak() 메서드 호출
        print("멍멍!")

class Cat(Animal):
    def speak(self):
        super().speak()  # 부모 클래스의 speak() 메서드 호출
        print("야옹!")

# 각 클래스의 메서드 호출
dog = Dog()
dog.speak()

cat = Cat()
cat.speak()


name = "John"
age = 30

# 문자열 포맷팅
message = "My name is {}. I am {} years old.".format(name, age)

# 결과 출력
print(message)