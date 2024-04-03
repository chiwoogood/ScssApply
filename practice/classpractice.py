



class Fruits(object):
    def __init__(self,name,tasty,ph):
        self.name = name
        self.tasty = tasty
        self.ph = ph

class WinterFruits(Fruits):
    def __init__(self,name,tasty,ph,birth_month):
        super().__init__(name,tasty,ph)
        self.birth_month = birth_month
    def __str__(self):
        return f"Name: {self.name}, Tasty: {self.tasty}, pH: {self.ph}, Birth Month: {self.birth_month}"
    


    
a = WinterFruits('strawberry','good','5.6','july')
print(a)