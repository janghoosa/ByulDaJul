from hanspell import spell_checker

class Model():
    def __init__(self):
        pass

    def correct_spelling(self, text):
        result = spell_checker.check(text).as_dict()
        return result["checked"]
