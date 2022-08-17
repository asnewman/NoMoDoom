import { getTopCommentsForPost, getTopPostsForDay, HnItem } from ".";

describe("getTopPostsForDay", () => {
  it("gets top posts for the day correctly", async () => {
    const dummyGetHackerNewsItem = (id: number): Promise<HnItem> => {
      if (id === 31706955) {
        return new Promise((resolve) =>
          resolve({
            by: "ash",
            kids: [2, 3, 4],
          })
        );
      } else if (id === 2) {
        return new Promise((resolve) =>
          resolve({
            by: "bob",
            kids: [],
            text: "hello",
          })
        );
      } else if (id === 3) {
        return new Promise((resolve) =>
          resolve({
            by: "charlie",
            kids: [],
            text: "world",
          })
        );
      } else if (id === 4) {
        return new Promise((resolve) =>
          resolve({
            by: "allie",
            kids: [],
            text: "foo",
          })
        );
      } else {
        return new Promise((resolve) =>
          resolve({
            by: "dean",
            kids: [],
            text: "foo",
          })
        );
      }
    };

    const res = await getTopPostsForDay(
      [postsHtml1, postsHtml2],
      1655073357596,
      dummyGetHackerNewsItem
    )

    expect(
      res
    ).toEqual(
      [
        {
          title: "US moves closer to recalling Tesla’s self-driving software",
          score: 498,
          link: "https://news.ycombinator.com/item?id=31706955",
          date: new Date("2022-06-12T01:39:48.000Z"),
          comments: [
            {
              content: "hello",
              user: "bob"
            },
            {
              content: "world",
              user: "charlie",
            },
            {
              content: "foo",
              user: "allie"
            }
          ]
        },
        {
          title: "Shortsightedness has become an epidemic",
          score: 465,
          link: "https://news.ycombinator.com/item?id=31711990",
          date: new Date("2022-06-12T13:17:34.000Z"),
          comments: [],
        },
        {
          title: "AirPlay and Touch Bar = Network Disaster",
          score: 411,
          link: "https://news.ycombinator.com/item?id=31706283",
          date: new Date("2022-06-12T00:31:03.000Z"),
          comments: [],
        },
        {
          title: "Ask HN: What's the coolest website you know?",
          score: 388,
          link: "https://news.ycombinator.com/item?id=31708366",
          date: new Date("2022-06-12T04:02:16.000Z"),
          comments: [],
        },
        {
          title:
            "Ask HN: Is there a TV on the market without “Smart TV” features?",
          score: 372,
          link: "https://news.ycombinator.com/item?id=31706835",
          date: new Date("2022-06-12T01:28:18.000Z"),
          comments: [],
        },
        {
          title:
            "Lilium achieves first main wing transition for all-electric aircraft [video]",
          score: 296,
          link: "https://news.ycombinator.com/item?id=31715067",
          date: new Date("2022-06-12T22:10:35.000Z"),
          comments: [],
        },
      ]
    );
  });
});

describe("getTopCommentsForPost", () => {
  it("gets correctly", async () => {
    const dummyGetHackerNewsItem = (id: number): Promise<HnItem> => {
      if (id === 1) {
        return new Promise((resolve) =>
          resolve({
            by: "ash",
            kids: [2, 3, 4],
          })
        );
      } else if (id === 2) {
        return new Promise((resolve) =>
          resolve({
            by: "bob",
            kids: [],
            text: "hello",
          })
        );
      } else if (id === 3) {
        return new Promise((resolve) =>
          resolve({
            by: "charlie",
            kids: [],
            text: "world",
          })
        );
      } else {
        return new Promise((resolve) =>
          resolve({
            by: "dean",
            kids: [],
            text: "foo",
          })
        );
      }
    };
    const res = await getTopCommentsForPost(1, dummyGetHackerNewsItem);
    expect(res).toEqual([
      { user: "bob", content: `hello` },
      { user: "charlie", content: `world` },
      { user: "dean", content: `foo` },
    ]);
  });
});

const postsHtml1 = `<html op="best" lang="en"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"><meta name="referrer" content="origin"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" type="text/css" href="1_files/news.css">
        <link rel="shortcut icon" href="https://news.ycombinator.com/favicon.ico">
        <title>Top Links | Hacker News</title></head><body cz-shortcut-listen="true"><center><table id="hnmain" width="85%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f6f6ef">
        <tbody><tr><td bgcolor="#ff6600"><table style="padding:2px" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td style="width:18px;padding-right:4px"><a href="https://news.ycombinator.com/"><img src="1_files/y18.gif" style="border:1px white solid;" width="18" height="18"></a></td>
                  <td style="line-height:12pt; height:10px;"><span class="pagetop"><b class="hnname"><a href="https://news.ycombinator.com/news">Hacker News</a></b>
              <a href="https://news.ycombinator.com/newest">new</a> | <a href="https://news.ycombinator.com/front">past</a> | <a href="https://news.ycombinator.com/newcomments">comments</a> | <a href="https://news.ycombinator.com/ask">ask</a> | <a href="https://news.ycombinator.com/show">show</a> | <a href="https://news.ycombinator.com/jobs">jobs</a> | <a href="https://news.ycombinator.com/submit">submit</a> | <font color="#ffffff">best</font>            </span></td><td style="text-align:right;padding-right:4px;"><span class="pagetop">
                              <a href="https://news.ycombinator.com/login?goto=best%3Fp%3D1">login</a>
                          </span></td>
              </tr></tbody></table></td></tr>
<tr id="pagespace" title="Top Links" style="height:10px"></tr><tr><td><table class="itemlist" cellspacing="0" cellpadding="0" border="0">
              <tbody><tr class="athing" id="31668426">
      <td class="title" valign="top" align="right"><span class="rank">1.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31668426" href="https://news.ycombinator.com/vote?id=31668426&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://github.blog/2022-06-08-sunsetting-atom/" class="titlelink">Sunsetting Atom</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=github.blog"><span class="sitestr">github.blog</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31668426">1313 points</span> by <a href="https://news.ycombinator.com/user?id=ewired" class="hnuser">ewired</a> <span class="age" title="2022-06-08T15:06:39"><a href="item?id=31668426">4 days ago</a></span> <span id="unv_31668426"></span> | <a href="item?id=31668426">850&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31696901">
      <td class="title" valign="top" align="right"><span class="rank">2.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31696901" href="https://news.ycombinator.com/vote?id=31696901&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="http://www.charlespetzold.com/blog/2022/06/Announcing-Code-2nd-Edition.html" class="titlelink">“Code” 2nd Edition</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=charlespetzold.com"><span class="sitestr">charlespetzold.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31696901">985 points</span> by <a href="https://news.ycombinator.com/user?id=emme" class="hnuser">emme</a> <span class="age" title="2022-06-10T17:14:44"><a href="item?id=31696901">2 days ago</a></span> <span id="unv_31696901"></span> | <a href="item?id=31696901">168&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31704789">
      <td class="title" valign="top" align="right"><span class="rank">3.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31704789" href="https://news.ycombinator.com/vote?id=31704789&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.dns.toys/" class="titlelink">DNS Toys</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=dns.toys"><span class="sitestr">dns.toys</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31704789">866 points</span> by <a href="https://news.ycombinator.com/user?id=edent" class="hnuser">edent</a> <span class="age" title="2022-06-11T14:44:00"><a href="item?id=31704789">1 day ago</a></span> <span id="unv_31704789"></span> | <a href="item?id=31704789">93&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31693490">
      <td class="title" valign="top" align="right"><span class="rank">4.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31693490" href="https://news.ycombinator.com/vote?id=31693490&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://techcrunch.com/2022/06/10/apple-m1-unpatchable-flaw/" class="titlelink">MIT researchers uncover ‘unpatchable’ flaw in Apple M1 chips</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=techcrunch.com"><span class="sitestr">techcrunch.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31693490">850 points</span> by <a href="https://news.ycombinator.com/user?id=markus_zhang" class="hnuser">markus_zhang</a> <span class="age" title="2022-06-10T13:03:01"><a href="item?id=31693490">2 days ago</a></span> <span id="unv_31693490"></span> | <a href="item?id=31693490">185&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31647181">
      <td class="title" valign="top" align="right"><span class="rank">5.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31647181" href="https://news.ycombinator.com/vote?id=31647181&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://untools.co/" class="titlelink">Tools for Better Thinking</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=untools.co"><span class="sitestr">untools.co</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31647181">845 points</span> by <a href="https://news.ycombinator.com/user?id=andsoitis" class="hnuser">andsoitis</a> <span class="age" title="2022-06-06T22:24:04"><a href="item?id=31647181">6 days ago</a></span> <span id="unv_31647181"></span> | <a href="item?id=31647181">70&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31670355">
      <td class="title" valign="top" align="right"><span class="rank">6.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31670355" href="https://news.ycombinator.com/vote?id=31670355&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.justice.gov/usao-edpa/pr/former-us-congressman-and-philadelphia-political-operative-pleads-guilty-election-fraud" class="titlelink">Former U.S. congressman, operative pleads guilty to election fraud charges</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=justice.gov"><span class="sitestr">justice.gov</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31670355">823 points</span> by <a href="https://news.ycombinator.com/user?id=dmeocary" class="hnuser">dmeocary</a> <span class="age" title="2022-06-08T17:02:13"><a href="item?id=31670355">4 days ago</a></span> <span id="unv_31670355"></span> | <a href="item?id=31670355">813&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31643917">
      <td class="title" valign="top" align="right"><span class="rank">7.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31643917" href="https://news.ycombinator.com/vote?id=31643917&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://developer.apple.com/documentation/authenticationservices/public-private_key_authentication/supporting_passkeys" class="titlelink">Apple Passkey</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=developer.apple.com"><span class="sitestr">developer.apple.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31643917">814 points</span> by <a href="https://news.ycombinator.com/user?id=samwillis" class="hnuser">samwillis</a> <span class="age" title="2022-06-06T18:24:03"><a href="item?id=31643917">6 days ago</a></span> <span id="unv_31643917"></span> | <a href="item?id=31643917">398&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31670065">
      <td class="title" valign="top" align="right"><span class="rank">8.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31670065" href="https://news.ycombinator.com/vote?id=31670065&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.teachforamerica.org/one-day/opinion/stop-eliminating-gifted-programs-and-calling-it-equity" class="titlelink">The case for expanding rather than eliminating gifted education programs (2021)</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=teachforamerica.org"><span class="sitestr">teachforamerica.org</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31670065">793 points</span> by <a href="https://news.ycombinator.com/user?id=paulpauper" class="hnuser">paulpauper</a> <span class="age" title="2022-06-08T16:45:24"><a href="item?id=31670065">4 days ago</a></span> <span id="unv_31670065"></span> | <a href="item?id=31670065">867&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31673662">
      <td class="title" valign="top" align="right"><span class="rank">9.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31673662" href="https://news.ycombinator.com/vote?id=31673662&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://hexwords.netlify.app/" class="titlelink">Hexwords: Hex colors that are similar to words</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=hexwords.netlify.app"><span class="sitestr">hexwords.netlify.app</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31673662">787 points</span> by <a href="https://news.ycombinator.com/user?id=cialowicz" class="hnuser">cialowicz</a> <span class="age" title="2022-06-08T20:35:46"><a href="item?id=31673662">4 days ago</a></span> <span id="unv_31673662"></span> | <a href="item?id=31673662">164&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31652650">
      <td class="title" valign="top" align="right"><span class="rank">10.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31652650" href="https://news.ycombinator.com/vote?id=31652650&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://shkspr.mobi/blog/2022/06/ive-locked-myself-out-of-my-digital-life/" class="titlelink">I've locked myself out of my digital life</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=shkspr.mobi"><span class="sitestr">shkspr.mobi</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31652650">723 points</span> by <a href="https://news.ycombinator.com/user?id=edent" class="hnuser">edent</a> <span class="age" title="2022-06-07T11:36:43"><a href="item?id=31652650">5 days ago</a></span> <span id="unv_31652650"></span> | <a href="item?id=31652650">491&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31697636">
      <td class="title" valign="top" align="right"><span class="rank">11.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31697636" href="https://news.ycombinator.com/vote?id=31697636&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://smallstep.com/blog/if-openssl-were-a-gui/" class="titlelink">If OpenSSL were a GUI</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=smallstep.com"><span class="sitestr">smallstep.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31697636">716 points</span> by <a href="https://news.ycombinator.com/user?id=soheilpro" class="hnuser">soheilpro</a> <span class="age" title="2022-06-10T18:21:23"><a href="item?id=31697636">2 days ago</a></span> <span id="unv_31697636"></span> | <a href="item?id=31697636">228&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31664440">
      <td class="title" valign="top" align="right"><span class="rank">12.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31664440" href="https://news.ycombinator.com/vote?id=31664440&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://sive.rs/com" class="titlelink">Find a good available .com domain</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=sive.rs"><span class="sitestr">sive.rs</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31664440">674 points</span> by <a href="https://news.ycombinator.com/user?id=Tomte" class="hnuser">Tomte</a> <span class="age" title="2022-06-08T07:39:38"><a href="item?id=31664440">4 days ago</a></span> <span id="unv_31664440"></span> | <a href="item?id=31664440">282&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31693830">
      <td class="title" valign="top" align="right"><span class="rank">13.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31693830" href="https://news.ycombinator.com/vote?id=31693830&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.forbes.com/sites/jenamcgregor/2022/06/09/microsoft-announces-it-will-include-pay-ranges-in-all-us-job-postings-experts-predict-it-will-be-the-first-of-many/" class="titlelink">Microsoft will include pay ranges in all U.S. job postings</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=forbes.com/sites/jenamcgregor"><span class="sitestr">forbes.com/sites/jenamcgregor</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31693830">659 points</span> by <a href="https://news.ycombinator.com/user?id=blue_box" class="hnuser">blue_box</a> <span class="age" title="2022-06-10T13:24:53"><a href="item?id=31693830">2 days ago</a></span> <span id="unv_31693830"></span> | <a href="item?id=31693830">309&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31652291">
      <td class="title" valign="top" align="right"><span class="rank">14.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31652291" href="https://news.ycombinator.com/vote?id=31652291&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.engadget.com/eu-reaches-deal-to-make-usb-c-a-common-charger-for-most-electronic-devices-104605067.html" class="titlelink">EU reaches deal to make USB-C a common charger for most electronic devices</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=engadget.com"><span class="sitestr">engadget.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31652291">603 points</span> by <a href="https://news.ycombinator.com/user?id=geox" class="hnuser">geox</a> <span class="age" title="2022-06-07T10:50:09"><a href="item?id=31652291">5 days ago</a></span> <span id="unv_31652291"></span> | <a href="item?id=31652291">996&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31644008">
      <td class="title" valign="top" align="right"><span class="rank">15.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31644008" href="https://news.ycombinator.com/vote?id=31644008&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.apple.com/newsroom/2022/06/apple-unveils-m2-with-breakthrough-performance-and-capabilities/" class="titlelink">Apple Unveils M2</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=apple.com"><span class="sitestr">apple.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31644008">602 points</span> by <a href="https://news.ycombinator.com/user?id=yottabyte47" class="hnuser">yottabyte47</a> <span class="age" title="2022-06-06T18:33:27"><a href="item?id=31644008">6 days ago</a></span> <span id="unv_31644008"></span> | <a href="item?id=31644008">748&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31657591">
      <td class="title" valign="top" align="right"><span class="rank">16.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31657591" href="https://news.ycombinator.com/vote?id=31657591&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://amarioguy.github.io/m1windowsproject/" class="titlelink">Welcome to the M1 Windows project</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=amarioguy.github.io"><span class="sitestr">amarioguy.github.io</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31657591">596 points</span> by <a href="https://news.ycombinator.com/user?id=giuliomagnifico" class="hnuser">giuliomagnifico</a> <span class="age" title="2022-06-07T17:31:30"><a href="item?id=31657591">5 days ago</a></span> <span id="unv_31657591"></span> | <a href="item?id=31657591">260&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31650797">
      <td class="title" valign="top" align="right"><span class="rank">17.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31650797" href="https://news.ycombinator.com/vote?id=31650797&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://github.com/sensity-ai/dot" class="titlelink">Deepfake Offensive Toolkit (real-time deepfakes for virtual cameras)</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=github.com/sensity-ai"><span class="sitestr">github.com/sensity-ai</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31650797">555 points</span> by <a href="https://news.ycombinator.com/user?id=draugadrotten" class="hnuser">draugadrotten</a> <span class="age" title="2022-06-07T07:07:38"><a href="item?id=31650797">5 days ago</a></span> <span id="unv_31650797"></span> | <a href="item?id=31650797">320&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31677736">
      <td class="title" valign="top" align="right"><span class="rank">18.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31677736" href="https://news.ycombinator.com/vote?id=31677736&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://fev.al/posts/leet-code/" class="titlelink">Stop Interviewing with Leet Code</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=fev.al"><span class="sitestr">fev.al</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31677736">545 points</span> by <a href="https://news.ycombinator.com/user?id=charles_f" class="hnuser">charles_f</a> <span class="age" title="2022-06-09T05:04:38"><a href="item?id=31677736">3 days ago</a></span> <span id="unv_31677736"></span> | <a href="item?id=31677736">651&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31693287">
      <td class="title" valign="top" align="right"><span class="rank">19.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31693287" href="https://news.ycombinator.com/vote?id=31693287&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://github.com/iorate/ublacklist" class="titlelink">uBlacklist – Block specific sites from appearing in Google search results</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=github.com/iorate"><span class="sitestr">github.com/iorate</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31693287">526 points</span> by <a href="https://news.ycombinator.com/user?id=sanketpatrikar" class="hnuser">sanketpatrikar</a> <span class="age" title="2022-06-10T12:44:50"><a href="item?id=31693287">2 days ago</a></span> <span id="unv_31693287"></span> | <a href="item?id=31693287">307&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31640297">
      <td class="title" valign="top" align="right"><span class="rank">20.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31640297" href="https://news.ycombinator.com/vote?id=31640297&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.quantamagazine.org/graduate-students-side-project-proves-prime-number-conjecture-20220606/" class="titlelink">Graduate Student’s Side Project Proves Prime Number Conjecture</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=quantamagazine.org"><span class="sitestr">quantamagazine.org</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31640297">506 points</span> by <a href="https://news.ycombinator.com/user?id=theafh" class="hnuser">theafh</a> <span class="age" title="2022-06-06T13:40:48"><a href="item?id=31640297">6 days ago</a></span> <span id="unv_31640297"></span> | <a href="item?id=31640297">102&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31690452">
      <td class="title" valign="top" align="right"><span class="rank">21.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31690452" href="https://news.ycombinator.com/vote?id=31690452&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://web.archive.org/web/20220609202836/https://mirror.xyz/0x58E3a8Bc8CBFC10AC2972Fb9d0cF359E21eae56b/ZIO--5ywx1z-aKs0KCQ2PeTNutVKune7zhA1D09R0q0" class="titlelink">Coinbase employees petition to remove execs</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=archive.org"><span class="sitestr">archive.org</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31690452">502 points</span> by <a href="https://news.ycombinator.com/user?id=shh-shhh" class="hnuser">shh-shhh</a> <span class="age" title="2022-06-10T05:37:29"><a href="item?id=31690452">2 days ago</a></span> <span id="unv_31690452"></span> | <a href="item?id=31690452">441&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31706955">
      <td class="title" valign="top" align="right"><span class="rank">22.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31706955" href="https://news.ycombinator.com/vote?id=31706955&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://fortune.com/2022/06/10/elon-musk-tesla-nhtsa-investigation-traffic-safety-autonomous-fsd-fatal-probe/" class="titlelink">US moves closer to recalling Tesla’s self-driving software</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=fortune.com"><span class="sitestr">fortune.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31706955">498 points</span> by <a href="https://news.ycombinator.com/user?id=heavyset_go" class="hnuser">heavyset_go</a> <span class="age" title="2022-06-11T18:39:48"><a href="item?id=31706955">1 day ago</a></span> <span id="unv_31706955"></span> | <a href="item?id=31706955">545&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31701026">
      <td class="title" valign="top" align="right"><span class="rank">23.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31701026" href="https://news.ycombinator.com/vote?id=31701026&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://atrailtale.com/" class="titlelink">A Trail Tale</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=atrailtale.com"><span class="sitestr">atrailtale.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31701026">493 points</span> by <a href="https://news.ycombinator.com/user?id=royalroad" class="hnuser">royalroad</a> <span class="age" title="2022-06-11T01:05:24"><a href="item?id=31701026">1 day ago</a></span> <span id="unv_31701026"></span> | <a href="item?id=31701026">53&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31641716">
      <td class="title" valign="top" align="right"><span class="rank">24.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31641716" href="https://news.ycombinator.com/vote?id=31641716&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://theaviationgeekclub.com/sr-71-pilot-explains-how-he-survived-to-his-blackbird-disintegration-at-a-speed-of-mach-3-2/" class="titlelink">Pilot explains how he Survived Blackbird Disintegration at Mach 3.2</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=theaviationgeekclub.com"><span class="sitestr">theaviationgeekclub.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31641716">487 points</span> by <a href="https://news.ycombinator.com/user?id=mzs" class="hnuser">mzs</a> <span class="age" title="2022-06-06T15:28:22"><a href="item?id=31641716">6 days ago</a></span> <span id="unv_31641716"></span> | <a href="item?id=31641716">133&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31681515">
      <td class="title" valign="top" align="right"><span class="rank">25.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31681515" href="https://news.ycombinator.com/vote?id=31681515&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://nee.lv/2021/02/28/How-I-cut-GTA-Online-loading-times-by-70/" class="titlelink">I cut GTA Online loading times (2021)</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=nee.lv"><span class="sitestr">nee.lv</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31681515">474 points</span> by <a href="https://news.ycombinator.com/user?id=ddtaylor" class="hnuser">ddtaylor</a> <span class="age" title="2022-06-09T14:22:16"><a href="item?id=31681515">3 days ago</a></span> <span id="unv_31681515"></span> | <a href="item?id=31681515">212&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31680894">
      <td class="title" valign="top" align="right"><span class="rank">26.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31680894" href="https://news.ycombinator.com/vote?id=31680894&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://twitter.com/JustinRoiland/status/1534670496402268160" class="titlelink">Dropbox deletes Rick and Morty creators account for secret TOS violation</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=twitter.com/justinroiland"><span class="sitestr">twitter.com/justinroiland</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31680894">473 points</span> by <a href="https://news.ycombinator.com/user?id=casefields" class="hnuser">casefields</a> <span class="age" title="2022-06-09T13:29:30"><a href="item?id=31680894">3 days ago</a></span> <span id="unv_31680894"></span> | <a href="item?id=31680894">341&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31711990">
      <td class="title" valign="top" align="right"><span class="rank">27.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31711990" href="https://news.ycombinator.com/vote?id=31711990&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.economist.com/leaders/2022/06/09/short-sightedness-has-become-an-epidemic" class="titlelink">Shortsightedness has become an epidemic</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=economist.com"><span class="sitestr">economist.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31711990">465 points</span> by <a href="https://news.ycombinator.com/user?id=nilsbunger" class="hnuser">nilsbunger</a> <span class="age" title="2022-06-12T06:17:34"><a href="item?id=31711990">16 hours ago</a></span> <span id="unv_31711990"></span> | <a href="item?id=31711990">340&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31695881">
      <td class="title" valign="top" align="right"><span class="rank">28.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31695881" href="https://news.ycombinator.com/vote?id=31695881&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://news.mit.edu/2022/crispr-based-map-ties-every-human-gene-to-its-function-0609" class="titlelink">New CRISPR-based map ties every human gene to its function</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=news.mit.edu"><span class="sitestr">news.mit.edu</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31695881">457 points</span> by <a href="https://news.ycombinator.com/user?id=gumby" class="hnuser">gumby</a> <span class="age" title="2022-06-10T15:54:56"><a href="item?id=31695881">2 days ago</a></span> <span id="unv_31695881"></span> | <a href="item?id=31695881">176&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31698148">
      <td class="title" valign="top" align="right"><span class="rank">29.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31698148" href="https://news.ycombinator.com/vote?id=31698148&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="item?id=31698148" class="titlelink">Tell HN: Google does not list application permissions in the Play Store any more</a></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31698148">454 points</span> by <a href="https://news.ycombinator.com/user?id=datalist" class="hnuser">datalist</a> <span class="age" title="2022-06-10T19:03:54"><a href="item?id=31698148">2 days ago</a></span> <span id="unv_31698148"></span> | <a href="item?id=31698148">161&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31654762">
      <td class="title" valign="top" align="right"><span class="rank">30.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31654762" href="https://news.ycombinator.com/vote?id=31654762&amp;how=up&amp;goto=best%3Fp%3D1"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.electronicsweekly.com/news/business/793299-2022-03/" class="titlelink">Germany paying $5.5B for Intel fab</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=electronicsweekly.com"><span class="sitestr">electronicsweekly.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31654762">452 points</span> by <a href="https://news.ycombinator.com/user?id=throwaway4good" class="hnuser">throwaway4good</a> <span class="age" title="2022-06-07T14:22:43"><a href="item?id=31654762">5 days ago</a></span> <span id="unv_31654762"></span> | <a href="item?id=31654762">542&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
            <tr class="morespace" style="height:10px"></tr><tr><td colspan="2"></td>
      <td class="title"><a href="https://news.ycombinator.com/best?p=2" class="morelink" rel="next">More</a></td>    </tr>
  </tbody></table>
</td></tr>
<tr><td><img src="1_files/s.gif" width="0" height="10"><table width="100%" cellspacing="0" cellpadding="1"><tbody><tr><td bgcolor="#ff6600"></td></tr></tbody></table><br><center><span class="yclinks"><a href="https://news.ycombinator.com/newsguidelines.html">Guidelines</a>
        | <a href="https://news.ycombinator.com/newsfaq.html">FAQ</a>
        | <a href="https://news.ycombinator.com/lists">Lists</a>
        | <a href="https://github.com/HackerNews/API">API</a>
        | <a href="https://news.ycombinator.com/security.html">Security</a>
        | <a href="http://www.ycombinator.com/legal/">Legal</a>
        | <a href="http://www.ycombinator.com/apply/">Apply to YC</a>
        | <a href="mailto:hn@ycombinator.com">Contact</a></span><br><br><form method="get" action="//hn.algolia.com/">Search:
          <input type="text" name="q" size="17" autocorrect="off" spellcheck="false" autocapitalize="none" autocomplete="false"></form>
            </center></td></tr>
      </tbody></table></center><script type="text/javascript" src="1_files/hn.js"></script>
</body></html>`;

const postsHtml2 = `<html op="best" lang="en"><head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8"><meta name="referrer" content="origin"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" type="text/css" href="2_files/news.css">
        <link rel="shortcut icon" href="https://news.ycombinator.com/favicon.ico">
        <title>Top Links | Hacker News</title></head><body cz-shortcut-listen="true"><center><table id="hnmain" width="85%" cellspacing="0" cellpadding="0" border="0" bgcolor="#f6f6ef">
        <tbody><tr><td bgcolor="#ff6600"><table style="padding:2px" width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td style="width:18px;padding-right:4px"><a href="https://news.ycombinator.com/"><img src="2_files/y18.gif" style="border:1px white solid;" width="18" height="18"></a></td>
                  <td style="line-height:12pt; height:10px;"><span class="pagetop"><b class="hnname"><a href="https://news.ycombinator.com/news">Hacker News</a></b>
              <a href="https://news.ycombinator.com/newest">new</a> | <a href="https://news.ycombinator.com/front">past</a> | <a href="https://news.ycombinator.com/newcomments">comments</a> | <a href="https://news.ycombinator.com/ask">ask</a> | <a href="https://news.ycombinator.com/show">show</a> | <a href="https://news.ycombinator.com/jobs">jobs</a> | <a href="https://news.ycombinator.com/submit">submit</a> | <font color="#ffffff">best</font>            </span></td><td style="text-align:right;padding-right:4px;"><span class="pagetop">
                              <a href="https://news.ycombinator.com/login?goto=best%3Fp%3D2">login</a>
                          </span></td>
              </tr></tbody></table></td></tr>
<tr id="pagespace" title="Top Links" style="height:10px"></tr><tr><td><table class="itemlist" cellspacing="0" cellpadding="0" border="0">
              <tbody><tr class="athing" id="31662962">
      <td class="title" valign="top" align="right"><span class="rank">31.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31662962" href="https://news.ycombinator.com/vote?id=31662962&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.star-telegram.com/news/local/fort-worth/article262126407.html" class="titlelink">Man sues American Airlines over identification, jail time</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=star-telegram.com"><span class="sitestr">star-telegram.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31662962">436 points</span> by <a href="https://news.ycombinator.com/user?id=nabilhat" class="hnuser">nabilhat</a> <span class="age" title="2022-06-08T03:45:45"><a href="item?id=31662962">4 days ago</a></span> <span id="unv_31662962"></span> | <a href="item?id=31662962">306&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31689367">
      <td class="title" valign="top" align="right"><span class="rank">32.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31689367" href="https://news.ycombinator.com/vote?id=31689367&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://jbconsulting.substack.com/p/you-need-to-know-what-right-half" class="titlelink">You need to know what right-half-plane zeros are</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=jbconsulting.substack.com"><span class="sitestr">jbconsulting.substack.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31689367">434 points</span> by <a href="https://news.ycombinator.com/user?id=jbay808" class="hnuser">jbay808</a> <span class="age" title="2022-06-10T02:40:17"><a href="item?id=31689367">2 days ago</a></span> <span id="unv_31689367"></span> | <a href="item?id=31689367">271&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31679293">
      <td class="title" valign="top" align="right"><span class="rank">33.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31679293" href="https://news.ycombinator.com/vote?id=31679293&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://konradybcio.pl/linuxona7/" class="titlelink">We got Linux on the iPhone, iPad and other idevices</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=konradybcio.pl"><span class="sitestr">konradybcio.pl</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31679293">421 points</span> by <a href="https://news.ycombinator.com/user?id=zetaposter" class="hnuser">zetaposter</a> <span class="age" title="2022-06-09T09:42:59"><a href="item?id=31679293">3 days ago</a></span> <span id="unv_31679293"></span> | <a href="item?id=31679293">171&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31668274">
      <td class="title" valign="top" align="right"><span class="rank">34.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31668274" href="https://news.ycombinator.com/vote?id=31668274&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.blender.org/download/releases/3-2/" class="titlelink">Blender 3.2</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=blender.org"><span class="sitestr">blender.org</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31668274">421 points</span> by <a href="https://news.ycombinator.com/user?id=victornomad" class="hnuser">victornomad</a> <span class="age" title="2022-06-08T14:56:41"><a href="item?id=31668274">4 days ago</a></span> <span id="unv_31668274"></span> | <a href="item?id=31668274">88&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31706283">
      <td class="title" valign="top" align="right"><span class="rank">35.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31706283" href="https://news.ycombinator.com/vote?id=31706283&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://mnpn.github.io/blog/airplay-network-disaster" class="titlelink">AirPlay and Touch Bar = Network Disaster</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=mnpn.github.io"><span class="sitestr">mnpn.github.io</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31706283">411 points</span> by <a href="https://news.ycombinator.com/user?id=davidbarker" class="hnuser">davidbarker</a> <span class="age" title="2022-06-11T17:31:03"><a href="item?id=31706283">1 day ago</a></span> <span id="unv_31706283"></span> | <a href="item?id=31706283">157&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31648326">
      <td class="title" valign="top" align="right"><span class="rank">36.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31648326" href="https://news.ycombinator.com/vote?id=31648326&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="item?id=31648326" class="titlelink">Tell HN: I used the same computer since 2007 (with minor upgrades)</a></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31648326">404 points</span> by <a href="https://news.ycombinator.com/user?id=andrecarini" class="hnuser">andrecarini</a> <span class="age" title="2022-06-07T00:22:47"><a href="item?id=31648326">5 days ago</a></span> <span id="unv_31648326"></span> | <a href="item?id=31648326">290&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31681787">
      <td class="title" valign="top" align="right"><span class="rank">37.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31681787" href="https://news.ycombinator.com/vote?id=31681787&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://shotcut.org/" class="titlelink">Shotcut is a free, open-source, cross-platform video editor</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=shotcut.org"><span class="sitestr">shotcut.org</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31681787">402 points</span> by <a href="https://news.ycombinator.com/user?id=memorable" class="hnuser">memorable</a> <span class="age" title="2022-06-09T14:42:23"><a href="item?id=31681787">3 days ago</a></span> <span id="unv_31681787"></span> | <a href="item?id=31681787">97&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31651423">
      <td class="title" valign="top" align="right"><span class="rank">38.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31651423" href="https://news.ycombinator.com/vote?id=31651423&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.beaconcrm.org/blog/beacon-switching-to-four-day-work-week" class="titlelink">We're moving to a four-day work week at Beacon</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=beaconcrm.org"><span class="sitestr">beaconcrm.org</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31651423">393 points</span> by <a href="https://news.ycombinator.com/user?id=500and4" class="hnuser">500and4</a> <span class="age" title="2022-06-07T08:39:17"><a href="item?id=31651423">5 days ago</a></span> <span id="unv_31651423"></span> | <a href="item?id=31651423">333&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31708366">
      <td class="title" valign="top" align="right"><span class="rank">39.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31708366" href="https://news.ycombinator.com/vote?id=31708366&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="item?id=31708366" class="titlelink">Ask HN: What's the coolest website you know?</a></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31708366">388 points</span> by <a href="https://news.ycombinator.com/user?id=lagrange77" class="hnuser">lagrange77</a> <span class="age" title="2022-06-11T21:02:16"><a href="item?id=31708366">1 day ago</a></span> <span id="unv_31708366"></span> | <a href="item?id=31708366">350&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31644990">
      <td class="title" valign="top" align="right"><span class="rank">40.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31644990" href="https://news.ycombinator.com/vote?id=31644990&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://developer.apple.com/documentation/virtualization/running_intel_binaries_in_linux_vms_with_rosetta?language=objc" class="titlelink">Running Intel Binaries in Linux VMs with Rosetta</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=developer.apple.com"><span class="sitestr">developer.apple.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31644990">383 points</span> by <a href="https://news.ycombinator.com/user?id=gok" class="hnuser">gok</a> <span class="age" title="2022-06-06T19:35:18"><a href="item?id=31644990">6 days ago</a></span> <span id="unv_31644990"></span> | <a href="item?id=31644990">169&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31644019">
      <td class="title" valign="top" align="right"><span class="rank">41.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31644019" href="https://news.ycombinator.com/vote?id=31644019&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.apple.com/newsroom/2022/06/apple-unveils-all-new-macbook-air-supercharged-by-the-new-m2-chip/" class="titlelink">Apple unveils all-new MacBook Air, supercharged by the new M2 chip</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=apple.com"><span class="sitestr">apple.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31644019">381 points</span> by <a href="https://news.ycombinator.com/user?id=yottabyte47" class="hnuser">yottabyte47</a> <span class="age" title="2022-06-06T18:34:16"><a href="item?id=31644019">6 days ago</a></span> <span id="unv_31644019"></span> | <a href="item?id=31644019">568&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31675015">
      <td class="title" valign="top" align="right"><span class="rank">42.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31675015" href="https://news.ycombinator.com/vote?id=31675015&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.quantamagazine.org/researchers-achieve-absurdly-fast-algorithm-for-network-flow-20220608/" class="titlelink">Researchers achieve ‘absurdly fast’ algorithm for network flow</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=quantamagazine.org"><span class="sitestr">quantamagazine.org</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31675015">378 points</span> by <a href="https://news.ycombinator.com/user?id=aaraujo002" class="hnuser">aaraujo002</a> <span class="age" title="2022-06-08T22:09:15"><a href="item?id=31675015">4 days ago</a></span> <span id="unv_31675015"></span> | <a href="item?id=31675015">70&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31682303">
      <td class="title" valign="top" align="right"><span class="rank">43.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31682303" href="https://news.ycombinator.com/vote?id=31682303&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://nolanlawson.com/2022/06/09/the-collapse-of-complex-software/" class="titlelink">The collapse of complex software</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=nolanlawson.com"><span class="sitestr">nolanlawson.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31682303">377 points</span> by <a href="https://news.ycombinator.com/user?id=feross" class="hnuser">feross</a> <span class="age" title="2022-06-09T15:18:12"><a href="item?id=31682303">3 days ago</a></span> <span id="unv_31682303"></span> | <a href="item?id=31682303">296&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31706835">
      <td class="title" valign="top" align="right"><span class="rank">44.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31706835" href="https://news.ycombinator.com/vote?id=31706835&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="item?id=31706835" class="titlelink">Ask HN: Is there a TV on the market without “Smart TV” features?</a></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31706835">372 points</span> by <a href="https://news.ycombinator.com/user?id=nborwankar" class="hnuser">nborwankar</a> <span class="age" title="2022-06-11T18:28:18"><a href="item?id=31706835">1 day ago</a></span> <span id="unv_31706835"></span> | <a href="item?id=31706835">380&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31651086">
      <td class="title" valign="top" align="right"><span class="rank">45.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31651086" href="https://news.ycombinator.com/vote?id=31651086&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://bigthink.com/hard-science/large-hadron-collider-economics/" class="titlelink">Please, don't build another Large Hadron Collider</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=bigthink.com"><span class="sitestr">bigthink.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31651086">361 points</span> by <a href="https://news.ycombinator.com/user?id=khaled_ismaeel" class="hnuser">khaled_ismaeel</a> <span class="age" title="2022-06-07T07:51:38"><a href="item?id=31651086">5 days ago</a></span> <span id="unv_31651086"></span> | <a href="item?id=31651086">456&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31685545">
      <td class="title" valign="top" align="right"><span class="rank">46.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31685545" href="https://news.ycombinator.com/vote?id=31685545&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://watcher.guru/news/do-kwon-sent-80-million-a-month-to-secret-wallets" class="titlelink">Do kwon sent $80M a month to secret wallets?</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=watcher.guru"><span class="sitestr">watcher.guru</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31685545">359 points</span> by <a href="https://news.ycombinator.com/user?id=cwwc" class="hnuser">cwwc</a> <span class="age" title="2022-06-09T19:16:04"><a href="item?id=31685545">3 days ago</a></span> <span id="unv_31685545"></span> | <a href="item?id=31685545">436&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31702922">
      <td class="title" valign="top" align="right"><span class="rank">47.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31702922" href="https://news.ycombinator.com/vote?id=31702922&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.disruptingjapan.com/turned-500k-pissed-off-investors-shut-startup/" class="titlelink">I turned down $500k, pissed off my investors, and shut down my startup (2016)</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=disruptingjapan.com"><span class="sitestr">disruptingjapan.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31702922">355 points</span> by <a href="https://news.ycombinator.com/user?id=arunsivadasan" class="hnuser">arunsivadasan</a> <span class="age" title="2022-06-11T08:33:40"><a href="item?id=31702922">1 day ago</a></span> <span id="unv_31702922"></span> | <a href="item?id=31702922">139&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31682361">
      <td class="title" valign="top" align="right"><span class="rank">48.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31682361" href="https://news.ycombinator.com/vote?id=31682361&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://constructionphysics.substack.com/p/why-are-nuclear-power-construction" class="titlelink">Why are nuclear power construction costs so high?</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=constructionphysics.substack.com"><span class="sitestr">constructionphysics.substack.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31682361">351 points</span> by <a href="https://news.ycombinator.com/user?id=spenrose" class="hnuser">spenrose</a> <span class="age" title="2022-06-09T15:22:26"><a href="item?id=31682361">3 days ago</a></span> <span id="unv_31682361"></span> | <a href="item?id=31682361">485&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31653726">
      <td class="title" valign="top" align="right"><span class="rank">49.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31653726" href="https://news.ycombinator.com/vote?id=31653726&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.offline.cash/" class="titlelink">Show HN: The Bitcoin Note – Secure, Self-Custodial Bitcoin Wallets in Cash Form</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=offline.cash"><span class="sitestr">offline.cash</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31653726">344 points</span> by <a href="https://news.ycombinator.com/user?id=paulgerhardt" class="hnuser">paulgerhardt</a> <span class="age" title="2022-06-07T13:11:51"><a href="item?id=31653726">5 days ago</a></span> <span id="unv_31653726"></span> | <a href="item?id=31653726">464&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31668814">
      <td class="title" valign="top" align="right"><span class="rank">50.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31668814" href="https://news.ycombinator.com/vote?id=31668814&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://spiralwiki.com/" class="titlelink">Show HN: Read Wikipedia privately using homomorphic encryption</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=spiralwiki.com"><span class="sitestr">spiralwiki.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31668814">330 points</span> by <a href="https://news.ycombinator.com/user?id=blintz" class="hnuser">blintz</a> <span class="age" title="2022-06-08T15:29:33"><a href="item?id=31668814">4 days ago</a></span> <span id="unv_31668814"></span> | <a href="item?id=31668814">117&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31687782">
      <td class="title" valign="top" align="right"><span class="rank">51.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31687782" href="https://news.ycombinator.com/vote?id=31687782&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.migops.com/blog/2022/06/09/important-postgresql-14-update-to-avoid-silent-corruption-of-indexes/" class="titlelink">Important PostgreSQL 14 update to avoid silent corruption of indexes</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=migops.com"><span class="sitestr">migops.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31687782">329 points</span> by <a href="https://news.ycombinator.com/user?id=avi_vallarapu" class="hnuser">avi_vallarapu</a> <span class="age" title="2022-06-09T22:29:42"><a href="item?id=31687782">2 days ago</a></span> <span id="unv_31687782"></span> | <a href="item?id=31687782">93&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31687378">
      <td class="title" valign="top" align="right"><span class="rank">52.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31687378" href="https://news.ycombinator.com/vote?id=31687378&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.zainrizvi.io/blog/why-software-engineers-like-woodworking/" class="titlelink">Why software engineers like woodworking</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=zainrizvi.io"><span class="sitestr">zainrizvi.io</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31687378">327 points</span> by <a href="https://news.ycombinator.com/user?id=ZainRiz" class="hnuser">ZainRiz</a> <span class="age" title="2022-06-09T21:50:07"><a href="item?id=31687378">2 days ago</a></span> <span id="unv_31687378"></span> | <a href="item?id=31687378">243&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31690239">
      <td class="title" valign="top" align="right"><span class="rank">53.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31690239" href="https://news.ycombinator.com/vote?id=31690239&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://paperform.co/blog/toxic-productivity/" class="titlelink">Toxic Productivity</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=paperform.co"><span class="sitestr">paperform.co</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31690239">321 points</span> by <a href="https://news.ycombinator.com/user?id=jackdelaney" class="hnuser">jackdelaney</a> <span class="age" title="2022-06-10T05:01:04"><a href="item?id=31690239">2 days ago</a></span> <span id="unv_31690239"></span> | <a href="item?id=31690239">129&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31686615">
      <td class="title" valign="top" align="right"><span class="rank">54.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31686615" href="https://news.ycombinator.com/vote?id=31686615&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="http://www.alwaysownyourplatform.com/" class="titlelink">Always Own Your Platform (2019)</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=alwaysownyourplatform.com"><span class="sitestr">alwaysownyourplatform.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31686615">319 points</span> by <a href="https://news.ycombinator.com/user?id=ddtaylor" class="hnuser">ddtaylor</a> <span class="age" title="2022-06-09T20:45:09"><a href="item?id=31686615">3 days ago</a></span> <span id="unv_31686615"></span> | <a href="item?id=31686615">177&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31644188">
      <td class="title" valign="top" align="right"><span class="rank">55.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31644188" href="https://news.ycombinator.com/vote?id=31644188&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.apple.com/newsroom/2022/06/ipados-16-takes-the-versatility-of-ipad-even-further/" class="titlelink">iPadOS 16</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=apple.com"><span class="sitestr">apple.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31644188">313 points</span> by <a href="https://news.ycombinator.com/user?id=todsacerdoti" class="hnuser">todsacerdoti</a> <span class="age" title="2022-06-06T18:49:53"><a href="item?id=31644188">6 days ago</a></span> <span id="unv_31644188"></span> | <a href="item?id=31644188">356&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31675727">
      <td class="title" valign="top" align="right"><span class="rank">56.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31675727" href="https://news.ycombinator.com/vote?id=31675727&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://en.wikipedia.org/wiki/The_Last_Question" class="titlelink">The Last Question</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=wikipedia.org"><span class="sitestr">wikipedia.org</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31675727">311 points</span> by <a href="https://news.ycombinator.com/user?id=thewarpaint" class="hnuser">thewarpaint</a> <span class="age" title="2022-06-08T23:19:59"><a href="item?id=31675727">3 days ago</a></span> <span id="unv_31675727"></span> | <a href="item?id=31675727">150&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31665928">
      <td class="title" valign="top" align="right"><span class="rank">57.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31665928" href="https://news.ycombinator.com/vote?id=31665928&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://kotaku.com/nintendo-piracy-case-bowser-xecuter-team-prison-pirate-1849026479" class="titlelink">Nintendo's big piracy case is a sad story</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=kotaku.com"><span class="sitestr">kotaku.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31665928">309 points</span> by <a href="https://news.ycombinator.com/user?id=danso" class="hnuser">danso</a> <span class="age" title="2022-06-08T11:46:10"><a href="item?id=31665928">3 days ago</a></span> <span id="unv_31665928"></span> | <a href="item?id=31665928">250&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31676445">
      <td class="title" valign="top" align="right"><span class="rank">58.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31676445" href="https://news.ycombinator.com/vote?id=31676445&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://amasad.me/moad" class="titlelink">50th Anniversary of the Mother of All Demos (2018)</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=amasad.me"><span class="sitestr">amasad.me</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31676445">300 points</span> by <a href="https://news.ycombinator.com/user?id=jdcampolargo" class="hnuser">jdcampolargo</a> <span class="age" title="2022-06-09T01:01:36"><a href="item?id=31676445">3 days ago</a></span> <span id="unv_31676445"></span> | <a href="item?id=31676445">82&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31651146">
      <td class="title" valign="top" align="right"><span class="rank">59.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31651146" href="https://news.ycombinator.com/vote?id=31651146&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://sre.google/sre-book/eliminating-toil/" class="titlelink">Eliminating Toil</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=sre.google"><span class="sitestr">sre.google</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31651146">300 points</span> by <a href="https://news.ycombinator.com/user?id=omarfarooq" class="hnuser">omarfarooq</a> <span class="age" title="2022-06-07T08:00:04"><a href="item?id=31651146">5 days ago</a></span> <span id="unv_31651146"></span> | <a href="item?id=31651146">82&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class="athing" id="31715067">
      <td class="title" valign="top" align="right"><span class="rank">60.</span></td>      <td class="votelinks" valign="top"><center><a id="up_31715067" href="https://news.ycombinator.com/vote?id=31715067&amp;how=up&amp;goto=best%3Fp%3D2"><div class="votearrow" title="upvote"></div></a></center></td><td class="title"><a href="https://www.youtube.com/watch?v=QNl0DDUnp0E" class="titlelink">Lilium achieves first main wing transition for all-electric aircraft [video]</a><span class="sitebit comhead"> (<a href="https://news.ycombinator.com/from?site=youtube.com"><span class="sitestr">youtube.com</span></a>)</span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="score" id="score_31715067">296 points</span> by <a href="https://news.ycombinator.com/user?id=tomohawk" class="hnuser">tomohawk</a> <span class="age" title="2022-06-12T15:10:35"><a href="item?id=31715067">7 hours ago</a></span> <span id="unv_31715067"></span> | <a href="item?id=31715067">248&nbsp;comments</a>              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
            <tr class="morespace" style="height:10px"></tr><tr><td colspan="2"></td>
      <td class="title"><a href="https://news.ycombinator.com/best?p=3" class="morelink" rel="next">More</a></td>    </tr>
  </tbody></table>
</td></tr>
<tr><td><img src="2_files/s.gif" width="0" height="10"><table width="100%" cellspacing="0" cellpadding="1"><tbody><tr><td bgcolor="#ff6600"></td></tr></tbody></table><br><center><span class="yclinks"><a href="https://news.ycombinator.com/newsguidelines.html">Guidelines</a>
        | <a href="https://news.ycombinator.com/newsfaq.html">FAQ</a>
        | <a href="https://news.ycombinator.com/lists">Lists</a>
        | <a href="https://github.com/HackerNews/API">API</a>
        | <a href="https://news.ycombinator.com/security.html">Security</a>
        | <a href="http://www.ycombinator.com/legal/">Legal</a>
        | <a href="http://www.ycombinator.com/apply/">Apply to YC</a>
        | <a href="mailto:hn@ycombinator.com">Contact</a></span><br><br><form method="get" action="//hn.algolia.com/">Search:
          <input type="text" name="q" size="17" autocorrect="off" spellcheck="false" autocapitalize="none" autocomplete="false"></form>
            </center></td></tr>
      </tbody></table></center><script type="text/javascript" src="2_files/hn.js"></script>
</body></html>`;
