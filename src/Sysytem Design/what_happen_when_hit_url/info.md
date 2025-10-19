# What happen when you enter a URL at browser

### 1. Understanding the URL (Universal Resource Locator)

The process begins with the **URL**, which stands for Universal Resource Locator. The primary function of the URL is to specify the exact resource on the server that the browser needs to load.

The URL is composed of four distinct parts:

*   **Scheme:** This is the first part, often `http://` or `https://`. It instructs the browser on which protocol to use to connect to the server. When using **HTTPS**, the connection is encrypted, unlike standard HTTP.
*   **Domain:** This is the domain name of the site, such as `example.com` in the transcript's illustration.
*   **Path** and **Resource:** Although the distinction between these two parts is often unclear, they collectively specify the resource on the server. They can be conceptually thought of as the directory and file, respectively, in a typical file system.

### 2. DNS Lookup (Domain Name System)

Before the browser can communicate with the server, it must determine how to reach it. This is accomplished through a process called **DNS lookup**.

*   **Function:** DNS translates human-readable **domain names** (like `example.com`) into **IP addresses**, allowing browsers to load resources. It is often described as the internet's phone book.
*   **Caching for Speed:** The lookup process involves heavy caching to ensure speed. The search for the IP address follows a specific hierarchy:
    1.  The **browser** first checks its own cache, where it holds the information for a short duration.
    2.  If not in the browser cache, the browser requests the information from the **operating system (OS)**.
    3.  The OS also maintains a cache for a short period of time.
    4.  If the OS does not have the answer, it makes a query out to the internet to a **DNS resolver**.
*   **Resolution Process:** This ultimately sets up an elaborate chain of requests involving many servers in the DNS infrastructure until the correct IP address is finally resolved. Crucially, the answer is cached at every step of this process.

### 3. Establishing the TCP Connection

Once the browser successfully retrieves the server's IP address (e.g., for `example.com`), the next step is to establish a connection.

*   **TCP Handshake:** The browser establishes a **TCP connection** with the server using the obtained IP address. This establishment involves a **handshake** that requires several network round trips to complete.
*   **Keep-Alive Optimization:** To speed up the loading process, modern browsers utilize **keep-alive connections**. This trick attempts to reuse an already established TCP connection to the server as much as possible.

### 4. Handling HTTPS (SSL/TLS Handshake)

If the requested protocol is **HTTPS** (indicating a secure connection), the process of establishing the connection becomes more complex.

*   **SSL/TLS Handshake:** HTTPS requires a complicated process known as the **SSL/TLS handshake**. This handshake is necessary to establish the encrypted connection between the browser and the server.
*   **Cost Reduction:** Because the SSL/TLS handshake is "expensive," browsers employ methods like **SSL session resumption** to attempt to lower this cost.

### 5. HTTP Request, Server Processing, and Response

With a connection established (either standard TCP or encrypted SSL/TLS), the browser can now communicate with the server.

*   **HTTP Request:** The browser sends an **HTTP request** to the server over the established TCP connection. The video describes HTTP itself as a "very simple protocol".
*   **Processing and Response:** The server processes the request it received. Following processing, the server sends a **response** back to the browser.
*   **Rendering:** Upon receiving the server's response, the browser begins the process of rendering the HTML content.

### 6. Fetching Additional Resources

Rarely is the initial HTML content sufficient for a fully functional webpage.

*   **Need for Resources:** Typically, there are **additional resources** that must be loaded, such as images or JavaScript bundles.
*   **Repetition:** To fetch these remaining components, the browser repeats the entire process described above: performing DNS lookup, establishing new TCP connections (if needed), and making subsequent HTTP requests until all necessary resources are loaded.
  



# Understanding Why the Browser Requests Multiple Files (HTML, JS, CSS)
The need for the browser to make separate network requests for files like HTML, JavaScript (JS) bundles, and images (and by extension, CSS) is fundamental to how modern web pages are constructed and delivered:
1. Initial HTML Retrieval: The browser’s first successful request results in the server sending back the HTML content. The HTML serves as the structural foundation and blueprint of the webpage.
2. Identifying Additional Resources: Within the HTML structure, there are often links, references, and tags that instruct the browser that it requires additional resources to load. These resources include items like JavaScript bundles, images, and files containing styling information (CSS).
3. Repeating the Process: To acquire these necessary components, the browser must repeat the entire network process outlined in the video. This includes:
    ◦ Making a new DNS lookup (if not cached).
    ◦ Establishing a new TCP connection (or reusing one via keep-alive).
    ◦ Making subsequent HTTP requests to fetch all the other resources needed to fully render the page.
In essence, the browser must request these separate files because the initial HTML response typically only contains the structure, not the interactivity (JS) or the visual styling (CSS). The page cannot be considered fully loaded until all these linked resources are fetched and processed.


The video details the sequence of events that follow entering a URL into a browser. Below is a step-by-step summary of this process:

### Step-by-Step Process: URL Input to Content Rendering

| Step | Action | Key Detail(s) |
| :--- | :--- | :--- |
| **1. Identify URL Components** | The browser analyses the **URL** (Universal Resource Locator). | The URL specifies the resource on the server and includes the **Scheme** (e.g., HTTP/HTTPS), **Domain**, **Path**, and **Resource**. |
| **2. DNS Lookup** | The browser initiates a **DNS lookup** to translate the domain name (e.g., `example.com`) into an IP address. | DNS (Domain Name System) is the internet’s phone book. The lookup is heavily cached, first checking the browser cache, then the operating system cache, before querying a DNS resolver on the internet. |
| **3. Establish TCP Connection** | The browser uses the resolved IP address to establish a **TCP connection** with the server. | This involves a handshake requiring several network round trips to complete. Modern browsers use **keep-alive connections** to reuse established TCP connections where possible. |
| **4. SSL/TLS Handshake (If HTTPS)** | If the protocol is **HTTPS**, an **SSL/TLS handshake** is required. | This complicated, expensive handshake establishes the **encrypted connection** between the browser and the server. |
| **5. Send HTTP Request** | The browser sends an **HTTP request** to the server over the established TCP connection. | HTTP is described as a very simple protocol. |
| **6. Receive Response & Render**| The server processes the request and sends a **response** back. | The browser receives the response and **renders the HTML content**. |
| **7. Fetch Additional Resources**| If the HTML requires more files (e.g., JavaScript bundles, images), the browser **repeats the process**. | The browser repeats the cycle (DNS lookup, establishing connection, HTTP requests) to fetch all remaining resources. |