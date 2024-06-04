const loop = async () => {
    for (let i = 0; i <= 20000; i++) {
        try {
            await (async () => {
            const like = document.querySelector(".css-xakz2y-ButtonActionItem");
            const next = document.querySelector(".css-1s9jpf8-ButtonBasicButtonContainer-StyledVideoSwitch");
            const copy = document.querySelector("button[data-e2e=browse-copy]");
            const video = document.querySelector("video");
            const timeVideo = video.duration;
            if(!next || !like || !timeVideo || !copy) {
                return
            };
            console.log("timeVideo", timeVideo);

            // Chờ 80% thời lượng video trước khi tiếp tục
            await new Promise(resolve => {
                setTimeout(resolve, timeVideo * 0.8 * 1000);
            });

            // Click like và sao chép
            like.click();
            copy.click();

            // Chờ 10% thời lượng video trước khi tiếp tục
            await new Promise(resolve => {
                setTimeout(resolve, timeVideo * 0.1 * 1000);
            });

            // Click next để chuyển đến video tiếp theo
            next.click();

            // Chờ 10% thời lượng video trước khi kết thúc lần lặp
            await new Promise(resolve => {
                setTimeout(resolve, timeVideo * 0.1 * 1000);
            });
        })();
        }
        catch {}
    }
};

loop();