import logging
import sys


def setup_logging():
    """
    Configure application logging format and handler.
    """
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )
    logger = logging.getLogger("ai_voice_copilot")
    return logger


logger = setup_logging()
