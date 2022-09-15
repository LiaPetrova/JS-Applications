import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyEvents } from '../api/events.js';

const profileTemplate = (events, user) => html`
<section id="profilePage">
<div class="userInfo">
    <div class="avatar">
        <img src="./images/profilePic.png">
    </div>
    <h2>${user.email}</h2>
</div>
<div class="board">

${events.length > 0
? events.map(eventCard)
: noEvents()}   
</div>
</section>`;

const eventCard = (event) => html`
<div class="eventBoard">
<div class="event-info">
    <img src=${event.imageUrl}>
    <h2>${event.title}</h2>
    <h6>${event.date}</h6>
    <a href="/details/${event._id}" class="details-button">Details</a>
</div>
</div>`;

const noEvents = () => html`
<div class="no-events">
<p>This user has no events yet!</p>
</div>`;


export async function profilePage (ctx) {
    const user = ctx.user;
    console.log(user);
    const events =  await getMyEvents(user._id);
    console.log(events);
    ctx.render(profileTemplate(events, user));

}