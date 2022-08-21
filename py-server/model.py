import json
from hanspell import spell_checker

class Model():
    def __init__(self):
        with open("assets/slang_map.json", "r") as f:
            self.slang_map = json.load(f)

    def correct_spelling(self, text):
        result = spell_checker.check(text).as_dict()
        return result["checked"]

    def replace_slang(self, text):
        replaced_text = text
        description_list = []

        for key in self.slang_map.keys():
            if key in text:
                replaced_text = replaced_text.replace(key, self.slang_map[key]['target'])
                description_list.append({
                    key: self.slang_map[key]['description']
                })

        replaced_text = self.correct_spelling(replaced_text)
        
        return {
            "result": replaced_text,
            "description": description_list
        }
