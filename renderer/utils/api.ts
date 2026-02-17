export async function fetchWithRetry(url, options = {}, retries = 3, timeout = 5000) {
    const { signal } = new AbortController();
    options.signal = signal;

    const fetchWithTimeout = async () => {
        return new Promise((resolve, reject) => {
            const id = setTimeout(() => {
                reject(new Error('Timeout exceeded'));
            }, timeout);

            fetch(url, options)
                .then(response => {
                    clearTimeout(id);
                    if (!response.ok) {
                        return reject(new Error('Network response was not ok'));
                    }
                    resolve(response);
                })
                .catch(reject);
        });
    };

    for (let i = 0; i < retries; i++) {
        try {
            return await fetchWithTimeout();
        } catch (error) {
            if (i === retries - 1) throw error; // rethrow the last error
        }
    }
}