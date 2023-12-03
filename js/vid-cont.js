const generateCards = async (catID) => {
    const vidCont = document.getElementById('video-container');
    const noContentContainer = document.getElementById('no-content-container');
    vidCont.innerHTML = '';

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${catID}`);
    const data = await res.json();
    const videos = data.data;

    if (videos.length === 0) {
        noContentContainer.classList.remove('hidden');
    }
    else {
        noContentContainer.classList.add('hidden');
        for (const video of videos) {
            displayVid(video)
        }
    }
}


const displayVid = (vid) => {
    const vidCont = document.getElementById('video-container');
    const vidCard = document.createElement('div');
    vidCard.classList = `card lg:w-96 w-80 md:mx-5`;
    // time
    if (vid.others.posted_date) {
        const stringToNum = parseInt(vid.others.posted_date);
        const hours = Math.floor(stringToNum / 3600);
        const minutes = Math.floor((stringToNum % 3600) / 60);
        timeDifference = `<span>${hours} hr </span><span>${minutes} min</span> ago`;
    }

    // Svg code
    const verificationSvg = vid.authors[0].verified === "" ? `
    <svg id="verified" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <!-- svg -->
    <svg id="verified" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clip-path="url(#clip0_11_34)">
          <path d="M19.375 10.0001C19.375 10.8001 18.3922 11.4595 18.1953 12.197C17.9922 12.9595 18.5063 14.022 18.1203 14.6892C17.7281 15.3673 16.5484 15.4486 15.9984 15.9986C15.4484 16.5486 15.3672 17.7282 14.6891 18.1204C14.0219 18.5064 12.9594 17.9923 12.1969 18.1954C11.4594 18.3923 10.8 19.3751 10 19.3751C9.2 19.3751 8.54062 18.3923 7.80312 18.1954C7.04062 17.9923 5.97813 18.5064 5.31094 18.1204C4.63281 17.7282 4.55156 16.5486 4.00156 15.9986C3.45156 15.4486 2.27187 15.3673 1.87969 14.6892C1.49375 14.022 2.00781 12.9595 1.80469 12.197C1.60781 11.4595 0.625 10.8001 0.625 10.0001C0.625 9.20012 1.60781 8.54075 1.80469 7.80325C2.00781 7.04075 1.49375 5.97825 1.87969 5.31106C2.27187 4.63293 3.45156 4.55168 4.00156 4.00168C4.55156 3.45168 4.63281 2.272 5.31094 1.87981C5.97813 1.49387 7.04062 2.00793 7.80312 1.80481C8.54062 1.60793 9.2 0.625122 10 0.625122C10.8 0.625122 11.4594 1.60793 12.1969 1.80481C12.9594 2.00793 14.0219 1.49387 14.6891 1.87981C15.3672 2.272 15.4484 3.45168 15.9984 4.00168C16.5484 4.55168 17.7281 4.63293 18.1203 5.31106C18.5063 5.97825 17.9922 7.04075 18.1953 7.80325C18.3922 8.54075 19.375 9.20012 19.375 10.0001Z" fill="#2568EF"/>
          <path d="M12.7094 7.20637L9.14062 10.7751L7.29062 8.92668C6.88906 8.52512 6.2375 8.52512 5.83594 8.92668C5.43437 9.32824 5.43437 9.97981 5.83594 10.3814L8.43125 12.9767C8.82187 13.3673 9.45625 13.3673 9.84687 12.9767L14.1625 8.66106C14.5641 8.25949 14.5641 7.60793 14.1625 7.20637C13.7609 6.80481 13.1109 6.80481 12.7094 7.20637Z" fill="#FFFCEE"/>
        </g>
        <defs>
          <clipPath id="clip0_11_34">
            <rect width="20" height="20" fill="white"/>
          </clipPath>
        </defs>
      </svg>
    </svg>` : '';
    // main generated program
    vidCard.innerHTML = `
    <!-- images and time stamp -->
    <div class=" relative">
        <div class="">
            <img class="w-full md:h-52 relative" src="${vid.thumbnail}" alt="Shoes" />
        </div>
        ${vid.others.posted_date ?
            `<p class="text-sm font-normal text-right p-1 bg-black text-white absolute bottom-0 right-0 m-3 rounded-md">
                ${timeDifference}
            </p>` : ''}
    </div>
    <!-- card body -->
    <div class="card-body px-2">
        <div class="flex flex-row gap-4">
            <!-- channel avatar -->
            <img src="${vid.authors[0].profile_picture}" class="rounded-full w-14 h-14" />
            <div>
                <!-- text -->
                <h1 class="text-base font-bold text-[#171717]">${vid.title}</h1>
                <!-- channel name and verification -->
                <div class="inline-flex gap-2 text-[#171717b3]">
                    <p class="text-sm font-normal">${vid.authors[0].profile_name}</p>
                    ${verificationSvg}
                    <!-- views -->
                </div>
                <p class="text-sm font-normal text-[#171717b3]"><span class="view-count">${vid.others.views}</span> Views</p>
            </div>
        </div>
    </div>
    `;
    vidCont.appendChild(vidCard);

    // show svg section
    const verifiedSvg = vidCard.querySelector('#verified');
    if (verifiedSvg) {
        if (vid.authors[0].verified === "") {
            verifiedSvg.classList.remove('hidden');
        } else {
            verifiedSvg.classList.add('hidden');
        }
    }
}

