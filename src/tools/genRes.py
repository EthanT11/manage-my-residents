# This script generates residents for the SupaBase database
import random
import csv

first_names = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank',
 'Grace', 'Hank', 'Ivy', 'Jack', 'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter',
 'Quinn', 'Ryan', 'Sara', 'Tom', 'Uma', 'Vince', 'Wendy', 'Xander', 'Yara', 'Zack']
 
last_names = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller',
 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris',
 'Martin', 'Thompson', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez',
 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King']

# Constants
AGE_MIN, AGE_MAX = 55, 105
ROOM_MIN, ROOM_MAX = 100, 200

CSV_FILE_NAME = 'residents.csv'
TXT_FILE_NAME = 'residents.txt'
CSV_HEADER_NAMES = ['first_name', 'last_name', 'age', 'room', 'wing']
NUMBER_OF_RESIDENTS = 30

def generate_resident():
	first_name = random.choice(first_names)
	last_name = random.choice(last_names)
	age = random.randint(AGE_MIN, AGE_MAX)
	room = random.randint(ROOM_MIN, ROOM_MAX)
	wing = random.choice(['Left', 'Right'])
	return f'{first_name}, {last_name}, {age}, {room}, {wing}'

def create_csv_file():
	with open(CSV_FILE_NAME, 'w', newline='') as f:
		writer = csv.writer(f)
		writer.writerow(CSV_HEADER_NAMES)
		for i in range(NUMBER_OF_RESIDENTS):
			writer.writerow(generate_resident().split(', '))
		f.close() # close file

def create_txt_file():
	with open(TXT_FILE_NAME, 'w') as f: # open file
		for i in range(NUMBER_OF_RESIDENTS):
			f.write(generate_resident() + '\n')
		f.close() # close file


def main():
	create_csv_file()
	create_res_file()


if __name__ == '__main__':
	main()
