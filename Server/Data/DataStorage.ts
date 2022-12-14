import fs from "fs";

type User = {
	name: string;
	password: string;
	city: string;
	street: string;
};

export type AuthenticatedUser = {
	name: string;
	city: string;
	street: string;
};

type LoginData = {
	name: string;
	password: string;
};

export class DataStorage {
	users: User[] = [];

	constructor() {
		this.readUsers();
	}

	private readUsers() {
		let loadedUsers: string | undefined;

		try {
			loadedUsers = fs.readFileSync("./Data/Users.txt").toString();
		} catch (error: any) {
			console.log("Nie udało się załadować pliku");
		}

		if (loadedUsers) {
			this.users = JSON.parse(loadedUsers) as User[];
		}
	}
	private saveUsers() {
		const stringified = JSON.stringify(this.users);

		try {
			fs.writeFileSync(".//Data/Users.txt", stringified);
		} catch (error: any) {
			console.log("Nie udało się zapisać do pliku");
		}
	}

	addUser(user: User) {
		const existingUser = this.users.find((item) => {
			return item.name === user.name;
		});
		if (existingUser) {
			return null;
		} else {
			this.users.push(user);
			this.saveUsers();
			return { name: user.name, city: user.city, street: user.street };
		}
	}

	public loginUser(user: LoginData) {
		const existingUser = this.users.find((item) => {
			return item.name === user.name;
		});
		if (existingUser && existingUser.password === user.password) {
			console.log(existingUser);
			return {
				name: existingUser.name,
				city: existingUser.city,
				street: existingUser.street,
			};
		} else {
			return null;
		}
	}
}

export const dataStorage = new DataStorage();
