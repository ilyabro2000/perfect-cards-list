const API_URL = 'https://vortex.korabli.su/api/graphql/glossary/';

const request = async (query: string) => {
  const result = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  });

  return result.json();
};

const getVehicle = async () => {
  try {
    const result = await request(`
          query Vehicles {
              vehicles {
                  title
                  description
                  level
                  id
                  icons {
                      large
                      medium
                  }
                  type {
                      name
                      title
                      icons {
                          default
                      }
                  }
                  nation {
                      name
                      title
                      color
                      icons {
                          small
                          medium
                          large
                      }
                  }
              }
          }
        `);

    return result?.data?.vehicles || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export {
  getVehicle,
};
