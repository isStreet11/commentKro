function search() {
    var searchVideo = document.getElementById("search_bar").value;
    console.log(searchVideo);
    fetchData(searchVideo);
}

function fetchData(url) {
    var videourl = url.split("://")[1];
    var commentId = videourl.split("/")[1];
    const videoId = commentId.split("?")[0]

    console.log(videoId);

    const api_Key = 'AIzaSyDnfsOjRC0Wch_a9gT5LuMIz3644KvEW4U';


    var userList = document.getElementById("list");
    if (!userList) {
        console.error("Element with ID 'list' not found.");
        return;
    }

    userList.innerHTML = '';
    fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${api_Key}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error("YouTube API Error:", data.error.message);
                return;
            }

            const comments = data.items;
            comments.forEach(element => {

                var commentName = element.snippet.topLevelComment.snippet.authorDisplayName;
                var commentText = element.snippet.topLevelComment.snippet.textDisplay;
                var listItem = document.createElement("li");
                listItem.classList.add('list_item');
                const nameDiv = document.createElement("div");
                nameDiv.classList.add("name");
                nameDiv.textContent = commentName;

                const commentDiv = document.createElement("div");
                commentDiv.classList.add("comment");
                commentDiv.textContent = commentText;

                listItem.append(nameDiv);
                listItem.append(commentDiv);



                userList.append(listItem);
            });

            console.log("Comments:", comments);

        })
        .catch(error => {
            console.error("Fetch Error:", error);
        });
}