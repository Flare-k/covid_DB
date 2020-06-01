import Cookie from "js-cookie";

export const state = () => ({
    files: [],
    file: null
});

export const mutations = {
    loadFiles(state, payload) {
        const { files } = payload;
        state.files = files;
    },
    uploadFolder(state, payload) {
        const { file } = payload;
        console.log(file);
        state.files.push(file);
    },
    uploadFiles(state, payload) {
        const { files } = payload;
        state.files.concat(files);
    },
    deleteFile(state, payload) {
        const { fileId } = payload;
        state.file = null;
        state.files.splice(
            state.files.findIndex(file => file.id === fileId),
            1
        );
    }
};

export const actions = {
    loadFiles({ commit }, payload) {
        return new Promise(async(resolve, reject) => {
            try {
                const { cookie } = payload;
                this.$axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${cookie}`;
                console.log("loadFiles", cookie);
                // const res = await this.$axios.get('http://127.0.0.1:8000/cloud/files/fileList', {
                //   withCredentials: true
                // });
                // const {files} = res.data;
                // commit('loadFiles', {files});
                commit("setToken", { cookie });
                return resolve();
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    },
    uploadFolder({ state, commit }, payload) {
        return new Promise(async(resolve, reject) => {
            try {
                // const {formData} = payload;
                const { file } = payload;
                const res = await this.$axios.post(
                    "http://127.0.0.1:8000/cloud/files/uploadFolder", { file }, {
                        withCredentials: true
                    }
                );
                console.log(res.data);
                const { folder } = res.data;
                commit("uploadFolder", { file: folder });
                return resolve();
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    },
    uploadFiles({ commit }, payload) {
        return new Promise(async(resolve, reject) => {
            try {
                const { formData } = payload;
                const res = await this.$axios.post('http://127.0.0.1:8000/cloud/files/uploadFiles', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                const { files } = res.data;
                commit('uploadFiles', files);
                return resolve();

            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    },
    deleteFolder({ commit }, payload) {
        return new Promise(async(resolve, reject) => {
            try {
                const { folderId } = payload;
                await this.$axios.get(
                    "http://127.0.0.1/files/deleteFile", {
                        fileId: folderId
                    }, {
                        withCredentials: true
                    }
                );
                commit("deleteFile", { fileId: folderId });
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    },
    deleteFile({ commit }, payload) {
        return new Promise(async(resolve, reject) => {
            try {
                const { fileId } = payload;
                await this.$axios.get(
                    "http://127.0.0.1/files/deleteFile", {
                        fileId: fileId
                    }, {
                        withCredentials: true
                    }
                );
                commit("deleteFile", { fileId: fileId });
            } catch (e) {
                console.error(e);
                return reject(e);
            }
        });
    }
    // updateFolder({commit}, payload) {
    //
    // },
    // updateFile({commit}, payload) {
    //
    // }
};