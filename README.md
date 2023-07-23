# Leaderboard REST API

A REST API for a leaderboard system built with Hapi and PostgreSQL, developed to be used in [Gigabot's Quest](https://raassh-23.github.io/tugas-akhir/).

## Opening the Project
1. Clone this repository
2. Install the dependencies
    ```bash
    npm install
    ```
3. Copy the `.env.example` file and rename it to `.env`, then fill in the values accordingly
4. Run the migrations
    ```bash
    npm run migrate up
    ```
4. Run the project
    ```bash
    npm run dev # for development
    npm run start # for production
    ```

## Related Links
- [Game Repository](https://github.com/raassh-23/tugas-akhir)
