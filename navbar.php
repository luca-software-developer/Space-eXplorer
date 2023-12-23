<nav id="navbar">
    <ul>
        <li>
            <a href="<?php echo dirname($_SERVER['PHP_SELF']) . '/'; ?>">
                <img src="img/logo.png" alt="Space eXplorer" title="Space eXplorer" width="50" height="50" />
                &nbsp;
                Space eXplorer
            </a>
            <i id="menu" class="bi bi-list"></i>
        </li>
        <li data-type="menu-item" class="menu-hidden">
            <a href="<?php echo dirname($_SERVER['PHP_SELF']) . '/#ranking'; ?>">
                <i class="bi bi-trophy-fill"></i>
                &nbsp;
                Classifica
            </a>
        </li>
        <li data-type="menu-item" class="menu-hidden">
            <a href="#">
                <i class="bi bi-people-fill"></i>
                &nbsp;
                Community
            </a>
        </li>
        <li data-type="menu-item" class="menu-hidden">
            <?php
            if (isset($_SESSION['nickname'])) {
            ?>
                <a href="dashboard.php">
                    <i class="bi bi-person-circle"></i>
                    &nbsp;
                    <?php echo $_SESSION['nickname']; ?>
                </a>
            <?php
            } else {
            ?>
                <a href="login.php?action=signin">
                    <i class="bi bi-person-circle"></i>
                    &nbsp;
                    Account
                </a>
            <?php
            }
            ?>
        </li>
    </ul>
</nav>