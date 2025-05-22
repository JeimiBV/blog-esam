const BASE_URL = "http://localhost:8081";

export const API_URLS = {
  SECTIONS: `${BASE_URL}/sections`,
  POSTS: `${BASE_URL}/posts`,
  SECTION_TYPES: `${BASE_URL}/section-types`,
  POST_TYPES: `${BASE_URL}/post-types`,
  AREAS: `${BASE_URL}/areas`,
  USERS: `${BASE_URL}/users`,
  UPLOADS: `${BASE_URL}/uploads`,
  SOCIAL_NETWORKS: `${BASE_URL}/social-networks`,
  POST_SOCIAL_NETWORKS: `${BASE_URL}/post-social-network`,
};
export const API_URLS_SEARCH = {
  AREAS: `${BASE_URL}/areas/search`,
  USERS: `${BASE_URL}/users/search`,
  POST_TYPES: `${BASE_URL}/post-types/search`,
  SECTIONS: `${BASE_URL}/sections/search`,
  POSTS: `${BASE_URL}/posts/search`,
  SECTION_TYPES: `${BASE_URL}/section-types/search`,
  SOCIAL_NETWORKS: `${BASE_URL}/social-network/search`,
  POST_SOCIAL_NETWORKS: `${BASE_URL}/post-social-network/search?postId=`,
};
