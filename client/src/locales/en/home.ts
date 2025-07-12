export default {
  home: {
    title: "Welcome",
    subtitle: {
      requests: "Geyser is in request phase",
      assignments: "Geyser is in assignment phase",
      results: "Geyser is in results phase",
      shutdown: "Geyser is closed",
    },
    message: {
      requests: `
<ol>
  <li>
    On the <i class="q-icon text-primary material-symbols-sharp">badge</i>
    My Service page, enter your base service, then add any service modifications
    (release, delegation, leave, etc.) and your external teaching assignments
    (i.e., all teaching that will count toward your service but is not listed in
    Geyser).
    <br />
    <b>
      The total shown must correspond to the number of hours that the commission
      needs to assign to you with courses available in Geyser.
    </b>
  </li>
  <br />
  <li>
    On the <i class="q-icon text-primary material-symbols-sharp">menu_book</i>
    Courses page, make your primary and secondary requests.
    <br />
    <b>Please request a number of hours at least equivalent to your total
    service in primary requests and make sufficient secondary requests in case
    your primary requests cannot all be satisfied.</b>
  </li>
</ol>`,
      assignments: `
<p>
  The commission's work is in progress. You will be informed when it is complete
  so you can view the assignments. In the meantime, you can still view requests
  but it is no longer possible to modify them.
</p>`,
      results: `
<p>
  You can now view the course assignments for this year. You also still have
  access to requests and assignments from previous years.
</p>`,
      shutdown: "",
    },
    alert: {
      postLogout: "You're logged out",
      organizationNotFound: "Organization not found",
      noAccess: "You don't have access",
      appDataFetching: "Loading…",
      appDataError: "Error while loading",
      organizationNotLoaded: "Could not load organization data",
      profileNotLoaded: "Could not load profile data",
      shutdown: "Geyser is currently closed",
      commissioner: "Geyser is not in assignments phase",
      pageNotFound: "Page not found",
    },
  },
} as const;
