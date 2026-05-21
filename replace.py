import os

replacements = {
    # Navbar
    'Վahanak': 'Վահանակ',
    'Օгtaterneр': 'Օգտատերեր',
    'Тiketer': 'Տոմսեր',
    'Аshkhatakitsner': 'Աշխատակիցներ',
    'Тsanusatsurnner': 'Ծանուցումներ',
    'Նшаnak': 'Նշանակ',
    'Ցuyts menyu': 'Ցույց տալ մենյուն',

    # Common
    'hajalutyun': 'հաջողություն',
    'skhalt': 'սխալ',
    'Bercvum e...': 'Բեռնվում է...',
    'Gortsolutyunner': 'Գործողություններ',
    'Xmbagrel': 'Խմբագրել',
    'Jnjel': 'Ջնջել',
    'Veradardal': 'Վերադառնալ',
    'Pahanel': 'Պահպանել',
    'Steghcel': 'Ստեղծել',
    'Tvyalner berelis skhalt': 'Տվյալներ բերելիս սխալ',
    'Skhalt tegi unesal': 'Սխալ տեղի ունեցավ',
    'Jnjelu skhalt': 'Ջնջելու սխալ',
    'Bolor Vichakner': 'Բոլոր Վիճակները',

    # Dashboard (index.js)
    'Vahanak — Help Desk Karavarum': 'Վահանակ — Help Desk Կառավարում',
    'Help Desk Karavarum Hamakarg — Hsnakan Vahanak': 'Help Desk Կառավարման Համակարգ — Գլխավոր Վահանակ',
    '📊 Vahanak': '📊 Վահանակ',
    'Help Desk Karavarum Hamakarg — Hsnakan Ararkogh': 'Help Desk Կառավարման Համակարգ — Գլխավոր',
    'Tvyalner-y bercvum en...': 'Տվյալները բեռնվում են...',
    'Bolor Ogtaterneр': 'Բոլոր Օգտատերերը',
    'Bac Tiketer': 'Բաց Տոմսեր',
    'Ntsaghik Tiketer': 'Ընթացիկ Տոմսեր',
    'Pakvats Tiketer': 'Փակված Տոմսեր',
    'Ashkhatakitsner': 'Աշխատակիցներ',
    'Akardatsvatsvats Tsanusatsurnner': 'Չկարդացված Ծանուցումներ',
    '🎫 Verjin Tiketer': '🎫 Վերջին Տոմսեր',
    'Boloры tеsel →': 'Բոլորը տեսնել →',
    'Tiketer chkan': 'Տոմսեր չկան',
    'Anhandznarkvats': 'Չհանձնված',
    '🔔 Verjin Tsanusatsurnner': '🔔 Վերջին Ծանուցումներ',
    'Tsanusatsurnner chkan': 'Ծանուցումներ չկան',
    ' · ✅ Kardatsvatsvats': ' · ✅ Կարդացված',
    ' · 📭 Akardatsvatsvats': ' · 📭 Չկարդացված',

    # Tiketer
    'Бас': 'Բաց',
    'Bас': 'Բաց',
    'Ntsaghik': 'Ընթացիկ',
    'Pakvats': 'Փակված',
    'Փакватs': 'Փակված',
    'Ĉatsr': 'Ցածր',
    'Ìijin': 'Միջին',
    'Bardzr': 'Բարձր',
    'Tiketer — Help Desk': 'Տոմսեր — Help Desk',
    'Tiketneri karavarum': 'Տոմսերի կառավարում',
    '🎫 Tiketer': '🎫 Տոմսեր',
    'tiket grvagrvats e hamakargum': 'տոմս գրանցված է համակարգում',
    '✨ Nor Tiket': '✨ Նոր Տոմս',
    'Vorоnel vernagir, nkaragrutyun...': 'Որոնել վերնագիր, նկարագրություն...',
    'Bolor Kargavichakner': 'Բոլոր Կարգավիճակները',
    'Bolor Kargnishner': 'Բոլոր Կարգերը',
    'Steghcel nor tiket bnagrov': 'Ստեղծել նոր տոմս բնագրով',
    'Vernagir': 'Վերնագիր',
    'Kargnish': 'Կարգ',
    'Kargavichak': 'Կարգավիճակ',
    'Kategoria': 'Կատեգորիա',
    'Steghtsoghogtater': 'Ստեղծող օգտատեր',
    'Handnvats': 'Հանձնված է',
    'Chhandnvats': 'Չհանձնված',
    'Вstahе՞q, vor uccum eq jnjel аyd tikety?': 'Վստա՞հ եք, որ ուզում եք ջնջել այս տոմսը։',
    'Tiket-y jnjelu depqum аynkaran tvalyalnery kkorcanven': 'Տոմսը ջնջելու դեպքում տվյալները կկորչեն',
    'Tiket-y hajolothabar xmbagrvets': 'Տոմսը հաջողությամբ խմբագրվեց',
    'Nor tiket hajolothabar steghtsvel': 'Նոր տոմս հաջողությամբ ստեղծվեց',
    'Tiket-y hajolothabar jnjvel': 'Տոմսը հաջողությամբ ջնջվեց',

    # Ashkhatakitsner
    'Ashkhatakitsner — Help Desk': 'Աշխատակիցներ — Help Desk',
    'Ashkhatakitsneri karavarum': 'Աշխատակիցների կառավարում',
    '👨‍💼 Ashkhatakitsner': '👨‍💼 Աշխատակիցներ',
    'ashkhatakits grvagrvats e hamakargum': 'աշխատակից գրանցված է համակարգում',
    '✨ Nor Ashkhatakits': '✨ Նոր Աշխատակից',
    'Vorоnel anun, bakhum...': 'Որոնել անուն, բաժին...',
    '✅ Aktiv': '✅ Ակտիվ',
    '❌ Voraktiv': '❌ Ոչ ակտիվ',
    'Ashkhatakitsner chkan': 'Աշխատակիցներ չկան',
    'Anun Azganun': 'Անուն Ազգանուն',
    'Bakhum': 'Բաժին',
    'Pashton': 'Պաշտոն',
    'El. Hasce': 'Էլ. Հասցե',
    'Herakhos': 'Հեռախոս',
    'Vichak': 'Վիճակ',
    'Vstahe՞q, vor uccum eq jnjel ayd ashkhatakitsin?': 'Վստա՞հ եք, որ ուզում եք ջնջել այս աշխատակցին։',
    'Ashkhatakits xmbagrvets': 'Աշխատակիցը խմբագրվեց',
    'Nor ashkhatakits steghtsvel': 'Նոր աշխատակից ստեղծվեց',
    'Ashkhatakits jnjvel': 'Աշխատակիցը ջնջվեց',
    'Ashkhatakitsner berelis skhalt': 'Աշխատակիցներ բերելիս սխալ',

    # Tsanusatsurnner
    'Tsanusatsurnner — Help Desk': 'Ծանուցումներ — Help Desk',
    'Tsanusatsurnneri karavarum': 'Ծանուցումների կառավարում',
    '🔔 Tsanusatsurnner': '🔔 Ծանուցումներ',
    ' nor': ' նոր',
    'tsanusatsurn,': 'ծանուցում,',
    'akardatsvatsvats': 'չկարդացված',
    '✨ Nor Tsanusatsurn': '✨ Նոր Ծանուցում',
    'Bolor Tsanusatsurnner': 'Բոլոր Ծանուցումները',
    '📭 Akardatsvatsvatsner': '📭 Չկարդացվածներ',
    '📬 Kardatsvatsvatsdner': '📬 Կարդացվածներ',
    'Teghekutyun': 'Տեղեկություն',
    'Zgushatsumn': 'Զգուշացում',
    'Skhalt': 'Սխալ',
    'Hajoghuthyun': 'Հաջողություն',
    'Kardatsvatsvats': 'Կարդացված',
    'Akardatsvatsvats': 'Չկարդացված',
    'Vstahe՞q, vor uccum eq jnjel ayd tsanusatsurn?': 'Վստա՞հ եք, որ ուզում եք ջնջել այս ծանուցումը։',
    'Tsanusatsurn xmbagrvets': 'Ծանուցումը խմբագրվեց',
    'Nor tsanusatsurn steghtsvel': 'Նոր ծանուցում ստեղծվեց',
    'Tsanusatsurn kardatsvatsvats nshanakvets': 'Ծանուցումը նշանակվեց կարդացված',
    'Tsanusatsurn jnjvel': 'Ծանուցումը ջնջվեց',
    'Nshanel kardatsvatsvats': 'Նշանակել որպես կարդացված',

    # Ogtaterner
    'Ogtaterneр — Help Desk': 'Օգտատերեր — Help Desk',
    'Ogtaterneri karavarum': 'Օգտատերերի կառավարում',
    '👥 Ogtaterneр': '👥 Օգտատերեր',
    'ogtater grvagrvats e hamakargum': 'օգտատեր գրանցված է համակարգում',
    '✨ Nor Ogtater': '✨ Նոր Օգտատեր',
    'Vorоnel anun, azganun, el. hasce...': 'Որոնել անուն, ազգանուն, էլ. հասցե...',
    'Voronelov arakutyun chi gtnvel': 'Որոնումով արդյունք չգտնվեց',
    'Ogtaterneр chkan': 'Օգտատերեր չկան',
    'Patraste ayl vor pretrutyun': 'Կատարեք այլ որոնում',
    'Sksel nor ogtater steghtsnelov': 'Սկսել նոր օգտատեր ստեղծելով',
    'Аnun Аzganun': 'Անուն Ազգանուն',
    'Der': 'Դեր',
    'Вstahе՞q, vor uccum eq jnjel аyd ogtaterin?': 'Վստա՞հ եք, որ ուզում եք ջնջել այս օգտատիրոջը։',
    'Ogtater-y jnjelu depqum аynkaran tvalyalnery kkorcanven': 'Օգտատիրոջը ջնջելու դեպքում տվյալները կկորչեն',
    'Ogtater-y hаjolothabar xmbagrvets': 'Օգտատերը հաջողությամբ խմբագրվեց',
    'Nor ogtater-y hаjolothabar steghtsvel': 'Նոր օգտատեր հաջողությամբ ստեղծվեց',
    'Ogtater-y hаjolothabar jnjvel': 'Օգտատերը հաջողությամբ ջնջվեց',
    'Ogtaterneр-y berelis skhalt': 'Օգտատերեր բերելիս սխալ',
    
    # Modals (TiketModal)
    'Tiket Xmbagrel': 'Խմբագրել Տոմսը',
    'Nor Tiket Steghcel': 'Ստեղծել Նոր Տոմս',
    'Vernagiry pahanjvats e': 'Վերնագիրը պարտադիր է',
    'Tiket-i vernagir...': 'Տոմսի վերնագիր...',
    'Nkaragrutyun': 'Նկարագրություն',
    'Knaraved nkaragrutyun...': 'Ավելացրեք նկարագրություն...',
    'Ցածр': 'Ցածր',
    'Bas': 'Բաց',
    'El. Posta, Aparats...': 'Էլ. Փոստ, Սարքավորում...',
    '— Yntrel —': '— Ընտրել —',
    'Handnvats Ashkhatakits': 'Հանձնված Աշխատակից',
    '— Handnel —': '— Հանձնել —',
    '⏳ Pahanjvum...': '⏳ Պահպանվում է...',
    '✏️ Pahanel': '✏️ Պահպանել',
    '🎫 Steghcel': '🎫 Ստեղծել',

    # OgtaterModal
    'Ադміністратор': 'Ադմինիստրատոր',
    'Հаճахорд': 'Հաճախորդ',
    'Ашкhatakits': 'Աշխատակից',
    'Ogtater Xmbagrel': 'Խմբագրել Օգտատիրոջը',
    'Nor Ogtater Steghcel': 'Ստեղծել Նոր Օգտատեր',
    'Аnunу pahanjvats e': 'Անունը պարտադիր է',
    'Аzganunу pahanjvats e': 'Ազգանունը պարտադիր է',
    'Еl. hascen pahanjvats e': 'Էլ. հասցեն պարտադիր է',
    'Gtnayin bard pahanjvats e': 'Գաղտնաբառը պարտադիր է',
    'Tyarin skhalt tegi unesal': 'Սխալ տեղի ունեցավ',
    'Аnun': 'Անուն',
    'Аram': 'Արամ',
    'Аzganun': 'Ազգանուն',
    'Petrosyan': 'Պետրոսյան',
    'Еl. Hаsce': 'Էլ. Հասցե',
    'Дер': 'Դեր',
    'Gtnayin Bard': 'Գաղտնաբառ',
    '(թողnels datark՝ chi xmbagrvum)': '(թողնել դատարկ՝ չխմբագրելու համար)',
    'Minimum 8 nshan': 'Առնվազն 8 նիշ',
    'Pahanjvum e...': 'Պահպանվում է...',
    'Пahanеl': 'Պահպանել',

    # AshkhatakitsModal
    'Ashkhatakits Xmbagrel': 'Խմբագրել Աշխատակցին',
    'Nor Ashkhatakits Steghcel': 'Ստեղծել Նոր Աշխատակից',
    'Anunы pahanjvats e': 'Անունը պարտադիր է',
    'Azganunы pahanjvats e': 'Ազգանունը պարտադիր է',
    'El. hascen pahanjvats e': 'Էլ. հասցեն պարտադիր է',
    'Anun': 'Անուն',
    'Karen': 'Կարեն',
    'Azganun': 'Ազգանուն',
    'Mkrtchyan': 'Մկրտչյան',
    'Bakhum (Bаjin)': 'Բաժին',
    'IT, HR, Tsarayutyun...': 'IT, HR, Ծառայություն...',
    'Tzragravоrоgh, Karavarich...': 'Ծրագրավորող, Կառավարիչ...',
    '👨‍💼 Steghcel': '👨‍💼 Ստեղծել',

    # TsanusatsurnModal
    'Tsanusatsurn Xmbagrel': 'Խմբագրել Ծանուցումը',
    'Nor Tsanusatsurn Steghcel': 'Ստեղծել Նոր Ծանուցում',
    'Haghordagutyuny pahanjvats e': 'Հաղորդագրությունը պարտադիր է',
    'Haghordagutyun': 'Հաղորդագրություն',
    'Tsanusatsurni haghordagutyuny...': 'Ծանուցման հաղորդագրությունը...',
    'Tesak': 'Տեսակ',
    'Kardatsvatsd?': 'Կարդացվա՞ծ է',
    'Chkardatsvatsvats': 'Չկարդացված',
    'Stacoghogtater': 'Ստացող օգտատեր',
    '— Yntrel Ogtater —': '— Ընտրել Օգտատեր —',
    'Kapvats Tiket': 'Կապված Տոմս',
    '— Yntrel Tiket —': '— Ընտրել Տոմս —',
    '🔔 Steghcel': '🔔 Ստեղծել',

    # DeleteModal
    'Hashtvarel Jnjumы': 'Հաստատել Ջնջումը',
    'Vstahe՞q, vor uccum eq jnjel': 'Վստա՞հ եք, որ ուզում եք ջնջել',
    'Ayd gortsolutyuny vervakan chи karoq linel: Am tvalyalnery lriv kkorcven:': 'Այս գործողությունը անդառնալի է: Տվյալները լրիվ կկորչեն:',
    'Jnjvum e...': 'Ջնջվում է...',

    # Modal
    'Vercnel': 'Փակել',
}

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    # Order replacements by length descending to prevent partial replacements (e.g. replacing 'Ashkhatakits' inside 'Ashkhatakitsner')
    for key, value in sorted(replacements.items(), key=lambda x: len(x[0]), reverse=True):
        content = content.replace(f"'{key}'", f"'{value}'")
        content = content.replace(f'"{key}"', f'"{value}"')
        content = content.replace(f">{key}<", f">{value}<")
        content = content.replace(f"> {key} <", f"> {value} <")
        content = content.replace(f">{key}", f">{value}")
        content = content.replace(f"{key}<", f"{value}<")
        content = content.replace(f" {key} ", f" {value} ")
        # content = content.replace(key, value) # This is risky, but some text might not be strictly quoted or tagged

    # Let's do exact match replace for the dictionary keys.
    # We will just do content.replace(key, value) but be careful.
    for key, value in sorted(replacements.items(), key=lambda x: len(x[0]), reverse=True):
        content = content.replace(key, value)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('c:\\Anahit\\aaaaaaa\\aaaaaaaaaaaaaaaa\\src'):
    for file in files:
        if file.endswith('.js'):
            process_file(os.path.join(root, file))

print("Done")
