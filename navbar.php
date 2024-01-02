<nav id="navbar">
    <ul>
        <li>
            <a href="<?php echo dirname($_SERVER['PHP_SELF']) . '/'; ?>">
                <img src="img/logo.png" alt="Space eXplorer" title="Space eXplorer" width="50" height="50" />
                <span class="menu-text">Space eXplorer</span>
            </a>
            <i id="menu" class="bi bi-list"></i>
        </li>
        <li data-type="menu-item" class="menu-hidden">
            <a href="<?php echo dirname($_SERVER['PHP_SELF']) . '/#ranking'; ?>" title="Classifica">
                <i class="bi bi-trophy-fill"></i>
                <span class="menu-text">Classifica</span>
            </a>
        </li>
        <li data-type="menu-item" class="menu-hidden">
            <a href="community.php" title="Community">
                <i class="bi bi-people-fill"></i>
                <span class="menu-text">Community</span>
            </a>
        </li>
        <li data-type="menu-item" class="menu-hidden user-menu-item">
            <?php
            if (isset($_SESSION['nickname'])) {
            ?>
                <a href="dashboard.php" title="Dashboard">
                    <i class="bi bi-person-circle"></i>
                    <div class="user-info-container">
                        <p class="user-name"><?php echo $_SESSION['nickname']; ?></p>
                        <p class="user-status">● Online</p>
                    </div>
                </a>
                <?php
                if (isset($_SESSION['nickname'])) {
                ?>
                    <a class="user-logout" href="logout.php" title="Log-Out">
                        <i class="bi bi-box-arrow-right"></i>
                    </a>
                <?php
                }
                ?>
            <?php
            } else {
            ?>
                <a href="login.php?action=signin" title="Sign-In">
                    <i class="bi bi-person-circle"></i>
                    <span class="menu-text">Account</span>
                </a>
            <?php
            }
            ?>
        </li>
    </ul>
</nav>