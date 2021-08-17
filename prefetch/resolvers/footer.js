const { request } = require("graphql-request");

const resolver = async () => {
    const data = await request(
        "https://cms.iare.se/graphql",
        `
    query {
        footer {
            locale
            social {
                id
                type
                href
            }
            responsiblePublisher {
                firstname
                lastname
            }
            logo {
                alternativeText
                width
                height
                url
            }
            localizations {
                locale
                social {
                    id
                    type
                    href
                }
                responsiblePublisher {
                    firstname
                    lastname
                }
                logo {
                    alternativeText
                    width
                    height
                    url
                }
            }
        }
    }
`
    );
    return {
        basename: "footer",
        data: data.footer,
    };
};

module.exports = resolver;