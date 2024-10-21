<?php
session_start();

if (!isset($_SESSION['tasks'])) {
    $_SESSION['tasks'] = [];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'add' && !empty($_POST['task'])) {
        $_SESSION['tasks'][] = ['task' => $_POST['task'], 'completed' => false];
    } elseif ($action === 'delete' && isset($_POST['index'])) {
        array_splice($_SESSION['tasks'], $_POST['index'], 1);
    } elseif ($action === 'toggle' && isset($_POST['index'])) {
        $_SESSION['tasks'][$_POST['index']]['completed'] = !$_SESSION['tasks'][$_POST['index']]['completed'];
    }
}

foreach ($_SESSION['tasks'] as $index => $task) {
    echo '<li>';
    echo '<input type="checkbox" '.($task['completed'] ? 'checked' : '').' onclick="toggleTask('.$index.')">';
    echo $task['completed'] ? '<strike>' . htmlspecialchars($task['task']) . '</strike>' : htmlspecialchars($task['task']);
    echo ' <button onclick="deleteTask('.$index.')">Eliminar</button>';
    echo '</li>';
}
?>
