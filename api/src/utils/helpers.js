const URL_API = "https://api.rawg.io/api"
const PAGE_SIZE=100
const REGEXP={
    UUID:/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/
}
module.exports = { URL_API, REGEXP ,PAGE_SIZE}