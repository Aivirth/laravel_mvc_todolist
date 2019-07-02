# Laravel + React project manager

Application created using laravel backend and react|redux to manage frontend.

## Features

-   Different users
-   JWT auth
-   Each project can have different tasks associated with it
-   LocalStorage copy of jwt to allow session save
-   Material-ui frontend
-   Search function

## Todo

-   Complete error handling across application
-   Better visualization of tasks status (completed / not completed)
-   Complete refactor to react hooks where necessary
-   Graphs
-   Bulk tasks actions (delete, complete)
-   Bulk projects actions (delete)

## Installation instructions

1. Clone repository in a directory of your choice

```sh
git clone git@github.com:Aivirth/laravel_mvc_todolist.git
```

2. Copy `.env.example` file and rename it to `.env`
3. Edit `.env` according to your system
4. Open terminal in your installation folder and type

```sh
php artisan key:generate
```

5. Bootstrap the application

```sh
composer install
npm install
php artisan migrate
php artisan db:seed
```

## Running the application (dev)

In the installation folder of the application open terminal and type

```sh
php artisan serve
```

Open another terminal tab or a new terminal and type

```sh
npm run watch
```

## License

This application is open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).
