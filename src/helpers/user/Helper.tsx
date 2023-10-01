// getUser işlevi, yerel depolamadan bir kullanıcı oturumu token'ını kontrol eder.
// Eğer token varsa, kullanıcı oturumu geçerli kabul edilir (true döner).
// Eğer token yoksa veya null ise, kullanıcı oturumu geçerli değil kabul edilir (false döner).

export const getUser = () => {
    const token = localStorage.getItem('token') !== null;
    const value = token ? true : false;
    return value;
}
