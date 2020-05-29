import Axios from './axiosInstance';
import {LOGIN_URL, COMMITS_URL} from './url';

async function doLogin({username, password}) {
  try {
    const {
      data: {name},
      config: {
        headers: {Authorization},
      },
    } = await Axios.get(LOGIN_URL, {
      auth: {
        username,
        password,
      },
      error: {
        401: {
          msg: 'Username or password is incorrect',
        },
        404: {
          msg: 'username is incorrect',
        },
      },
    });
    return {name, Authorization, status: 200};
  } catch (e) {
    return {status: e.response.status};
  }
}

async function getCommits({repo, owner, Authorization, page, goBack, logout}) {
  try {
    const {data} = await Axios.get(
      COMMITS_URL.replace('{owner}', owner).replace('{repo}', repo),
      {
        headers: {
          Authorization,
        },
        params: {
          page,
        },
        error: {
          401: {
            msg: 'login token Expired',
            action: logout,
          },
          404: {
            msg: 'Repo not found',
            action: goBack,
          },
        },
      },
    );
    return {data, status: 200};
  } catch (e) {
    return {status: e.response.status};
  }
}

export {doLogin, getCommits};
