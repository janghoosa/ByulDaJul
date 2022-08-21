import logging
import os

from logging.handlers import TimedRotatingFileHandler


def get_logger(name, log_dir = "./logs"):
    log_dir = log_dir

    logger = logging.getLogger(name)
    logger.setLevel(logging.INFO)
    formatter = logging.Formatter(
        "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    )

    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    file_handler = TimedRotatingFileHandler(
        filename=f"{log_dir}/flask.log", when="midnight", interval=1, encoding="utf-8"
    )
    console_handler = logging.StreamHandler()

    file_handler.setFormatter(formatter)
    console_handler.setFormatter(formatter)

    logger.addHandler(file_handler)
    logger.addHandler(console_handler)
    return logger
