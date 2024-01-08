dawn = int(input("เงินดาวน์: "))
mont = int(input("จำนวนงวด: "))
bat = int(input("ราคาเต็มซื้อ: "))

if mont == 9:
    print("ราคาเต็มซื้อ: ", bat)
    o = (dawn/100)*bat
    print("เงินดาวน์ที่ต้องจ่าย: ",o)

    n = ((bat-((dawn/100)*bat))/mont)+((bat-((dawn/100)*bat))/mont)*0.252
    print("ผ่อนต่อเดือน: ",n)
    aa = o+(n*mont)
    print('เงินดาวน์ที่ต้องจ่ายทั้งหมด: ', aa)

    print('ส่วนต่าง: ', aa-bat)
    
if mont == 12:
    print("ราคาเต็มซื้อ: ", bat)
    o = (dawn/100)*bat
    print("เงินดาวน์ที่ต้องจ่าย: ",o)

    n = ((bat-((dawn/100)*bat))/mont)+((bat-((dawn/100)*bat))/mont)*0.336
    print("ผ่อนต่อเดือน: ",n)
    aa = o+(n*mont)
    print('เงินดาวน์ที่ต้องจ่ายทั้งหมด: ', aa)

    print('ส่วนต่าง: ', aa-bat)
    
if mont == 18:
    print("ราคาเต็มซื้อ: ", bat)
    o = (dawn/100)*bat
    print("เงินดาวน์ที่ต้องจ่าย: ",o)

    n = ((bat-((dawn/100)*bat))/mont)+((bat-((dawn/100)*bat))/mont)*0.504
    print("ผ่อนต่อเดือน: ",n)
    aa = o+(n*mont)
    print('เงินดาวน์ที่ต้องจ่ายทั้งหมด: ', aa)

    print('ส่วนต่าง: ', aa-bat)

# 18 / 0.504

# 12/0.336
# 9/0.252